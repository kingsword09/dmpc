import * as cp from "node_cp";
import { path } from "path";
import * as process from "node_process";
import { readDmpJson } from "config_userconfig";
import { UserConfig } from "../types/userConfig.type";

export async function buildTask(dmpPath: string) {
  const { spawnSync } = cp;
  const _dmpPath = dmpPath ?? path.resolve(process.cwd(), "./dmp.json");
  const userConfig = await readDmpJson(_dmpPath);

  spawnSync("deno", [""]);
}
