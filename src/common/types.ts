import type { CharacterData } from "./character";

export interface ClaudeInstance {
  id: string;
  name: string;
  project: string;
  character: CharacterData;
  state: "idle" | "working" | "waiting_for_input";
  tty?: string;
  termProgram?: string;
  cwd?: string;
}

export const VALID_STATES: ClaudeInstance["state"][] = [
  "idle",
  "working",
  "waiting_for_input",
];
