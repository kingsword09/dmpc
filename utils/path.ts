import * as mod from "std_path";
import * as process from "node_process";

export const path = process.platform === "win32" ? mod.win32 : mod.posix;
