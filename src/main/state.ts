import type { ClaudeInstance } from "../common/types";
import { generateCharacter } from "../common/character";

const instances = new Map<string, ClaudeInstance>();

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function addInstanceWithId(
  id: string,
  project: string,
  name?: string,
  tty?: string,
  termProgram?: string,
  cwd?: string,
): ClaudeInstance {
  const seed = hashString(id);
  const character = generateCharacter(seed);
  const displayName = name ?? `cat-${id}`;
  const instance: ClaudeInstance = {
    id,
    name: displayName,
    project,
    character,
    state: "idle",
    tty,
    termProgram,
    cwd,
  };
  instances.set(id, instance);
  return instance;
}

export function updateInstanceState(
  id: string,
  state: ClaudeInstance["state"],
): { instance: ClaudeInstance; previousState: ClaudeInstance["state"] } | null {
  const instance = instances.get(id);
  if (!instance) return null;
  const previousState = instance.state;
  instance.state = state;
  return { instance, previousState };
}

export function removeInstance(id: string): boolean {
  return instances.delete(id);
}

export function getInstances(): ClaudeInstance[] {
  return Array.from(instances.values());
}
