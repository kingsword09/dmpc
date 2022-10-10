import * as cp from "node_cp";
import { path } from "utils_path";
import * as fs from "node_fs";
import * as process from "node_process";
import { readDmpJson } from "config_userconfig";
import { writeDmpDenoJsonc } from "config_deno";
import { writeGitIgnore } from "config_gitignore";
import { writeImportMap } from "config_importmap";
import { writeEntryFile } from "config_entry";

export async function buildTask(dmpPath: string) {
  const { spawnSync } = cp;
  const _dmpPath = dmpPath ?? path.resolve(process.cwd(), "./dmp.json");

  if (!fs.existsSync(_dmpPath)) {
    throw new Error("未找到dmp.json配置文件");
  }

  const root = path.dirname(_dmpPath);
  const userConfig = await readDmpJson(_dmpPath);
  const outDir = userConfig.outDir ?? ".npm";
  const importMap = userConfig.importMap;

  await writeGitIgnore(root, outDir);
  const entryFile = await writeDmpDenoJsonc(root, outDir);
  await writeImportMap(root, importMap);
  await writeEntryFile(entryFile, userConfig);

  spawnSync("deno", ["task", "build"], { cwd: root });
  console.log("build done!!!");
}
