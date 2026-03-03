import type { ClaudeInstance } from "../common/types";

declare global {
  interface Window {
    api: {
      getInstances: () => Promise<ClaudeInstance[]>;
      onInstancesChanged: (
        cb: (instances: ClaudeInstance[]) => void,
      ) => () => void;
      focusInstance: (id: string) => Promise<boolean>;
    };
  }
}
