import { path } from "utils_path";
import * as cp from "node_cp";
import * as fs from "node_fs";
import * as process from "node_process";
import { readDmpTs, readUserConfig, writeUserConfig } from "config_userconfig";
import { writeDmpDenoJsonc } from "config_deno";
import { writeGitIgnore } from "config_gitignore";
import { writeImportMap } from "config_importmap";
import { writeEntryFile } from "config_entry";
import { IUserConfig } from "../../types/userConfig.type.ts";

export async function buildTask(dmpPath: string) {
  const _dmpPath = dmpPath || path.resolve(process.cwd(), "./dmp.ts");

  if (!fs.existsSync(_dmpPath)) {
    console.warn("未找到dmp.ts配置文件");
    return;
  }

  const root = path.dirname(_dmpPath);
  const config = await readDmpTs(_dmpPath);
  const userConfig = await readUserConfig(config);

  await writeGitIgnore(root, userConfig.outDir);
  const entryFile = await writeDmpDenoJsonc(root, userConfig.denoJsonc);
  await writeImportMap(root, userConfig.importMap);
  await writeEntryFile(entryFile, userConfig.outDir);
  await writeUserConfig(root, userConfig as IUserConfig);

  cp.spawnSync("deno", ["task", "build"], { cwd: root });
  console.log("build done!!!");
}
