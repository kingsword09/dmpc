import * as fs from "node_fs";
import * as crypto from "node_crypto";
import { path } from "utils_path";
import type { DenoJsonc } from "../../types/denoJsonc.type.ts";

const { writeFile } = fs.promises;

export async function writeDenoJsonc(dest: string, denoJsonc?: DenoJsonc) {
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

export async function readDenoJsonc(file: string): Promise<DenoJsonc> {
  const denoJsonc = (await import(file, { assert: { type: "json" } })).default;

  return denoJsonc;
}

export async function writedmpcDenoJsonc(
  dest: string,
  denoJsonc?: DenoJsonc
): Promise<string> {
  const _denoJsonc =
    denoJsonc ??
    (
      await import("../../assets/denoJsoncTemplate.json", {
        assert: { type: "json" }
      })
    ).default;

  const fileName = path.resolve(dest, "./deno.jsonc");
  const entryFile = `./index_${crypto
    .createHash("md5")
    .update("dmpc")
    .digest("base64")}.ts`;

  _denoJsonc.tasks.build = `deno run -A ${entryFile}`;

  await writeFile(fileName, JSON.stringify(_denoJsonc), "utf-8");

  return path.resolve(dest, entryFile);
}
