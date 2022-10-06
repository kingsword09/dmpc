import * as fs from "node_fs";
import { path } from "path";
import type { DenoJsonc } from "../../types/denoJsonc.type.ts";

export async function writeDenoJsonc(dest: string, denoJsonc?: DenoJsonc) {
  const { writeFile } = fs.promises;
  const fileName = path.resolve(dest, "./deno.jsonc");
  let _denoJsonc = denoJsonc;

  if (!denoJsonc) {
    _denoJsonc = (
      await import("../../assets/denoJsoncTemplate.json", {
        assert: { type: "json" }
      })
    ).default;
  }

  await writeFile(fileName, JSON.stringify(_denoJsonc), "utf-8");

  return;
}
