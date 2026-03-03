import { contextBridge, ipcRenderer } from "electron";
import type { ClaudeInstance } from "../common/types";

const api = {
  getInstances: (): Promise<ClaudeInstance[]> =>
    ipcRenderer.invoke("get-instances"),
  onInstancesChanged: (cb: (instances: ClaudeInstance[]) => void) => {
    const listener = (_e: any, instances: ClaudeInstance[]) => cb(instances);
    ipcRenderer.on("instances-changed", listener);
    return () => ipcRenderer.removeListener("instances-changed", listener);
  },
  focusInstance: (id: string): Promise<boolean> =>
    ipcRenderer.invoke("focus-instance", id),
};

contextBridge.exposeInMainWorld("api", api);
