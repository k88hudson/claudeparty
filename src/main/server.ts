import type { IncomingMessage, ServerResponse } from "node:http";
import { createServer } from "node:http";
import { VALID_STATES } from "../common/types";
import type { ClaudeInstance } from "../common/types";
import {
  addInstanceWithId,
  removeInstance,
  updateInstanceState,
} from "./state";

const MAX_BODY_SIZE = 64 * 1024; // 64 KB

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: string) => {
      data += chunk;
      if (data.length > MAX_BODY_SIZE) {
        req.destroy();
        reject(new Error("Body too large"));
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

export function startServer(
  notifyRenderer: () => void,
  onWaitingForInput?: () => void,
) {
  const port = Number(process.env.CATPARTY_PORT) || 4689;

  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", `http://localhost:${port}`);

    // POST /api/session
    if (req.method === "POST" && url.pathname === "/api/session") {
      try {
        const body = JSON.parse(await readBody(req));
        const { session_id, project, state, tty, term_program, cwd } = body;
        if (!session_id || !project || !state) {
          return json(res, 400, {
            error: "Missing session_id, project, or state",
          });
        }
        if (!VALID_STATES.includes(state)) {
          return json(res, 400, { error: "Invalid state" });
        }

        // Try update first; if instance doesn't exist, add it
        const result = updateInstanceState(session_id, state);
        const instance = result
          ? result.instance
          : addInstanceWithId(
              session_id,
              project,
              undefined,
              tty,
              term_program,
              cwd,
            );

        if (!result) {
          updateInstanceState(session_id, state);
        }

        const previousState = result?.previousState ?? "idle";
        if (
          state === "waiting_for_input" &&
          previousState !== "waiting_for_input"
        ) {
          onWaitingForInput?.();
        }

        // Backfill tty if it wasn't set on creation
        if (tty && !instance.tty) {
          instance.tty = tty;
          instance.termProgram = term_program;
          instance.cwd = cwd;
        }
        notifyRenderer();
        return json(res, 200, instance);
      } catch {
        return json(res, 400, { error: "Invalid JSON" });
      }
    }

    // DELETE /api/session/:id
    const deleteMatch =
      req.method === "DELETE" && url.pathname.match(/^\/api\/session\/(.+)$/);
    if (deleteMatch) {
      const id = decodeURIComponent(deleteMatch[1]);
      const removed = removeInstance(id);
      if (removed) notifyRenderer();
      return json(res, removed ? 200 : 404, { ok: removed });
    }

    json(res, 404, { error: "Not found" });
  });

  server.listen(port, "127.0.0.1", () => {
    console.log(`catparty server listening on http://127.0.0.1:${port}`);
  });

  return server;
}
