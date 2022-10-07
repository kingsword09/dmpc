import * as cp from "node_cp";

export async function buildTask() {
  const { spawnSync } = cp;

  spawnSync("deno", [""]);
}
