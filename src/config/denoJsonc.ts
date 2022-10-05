import * as fs from "node_fs";
import { path } from "path";
import type { DenoJsonc } from "../../types/denoJsonc.type.ts";

export async function writeDenoJsonc(dest: string, denoJsonc: DenoJsonc) {
  const { writeFile } = fs.promises;
  const fileName = path.resolve(dest, "./deno.jsonc");

  await writeFile(fileName, denoJsonc, "utf-8");

  return;
}
