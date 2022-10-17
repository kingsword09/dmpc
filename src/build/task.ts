import { path } from "utils_path";
import * as cp from "node_cp";
import * as fs from "node_fs";
import * as process from "node_process";
import { readdmpcTs, readUserConfig, writeUserConfig } from "config_userconfig";
import { writedmpcDenoJsonc } from "config_deno";
import { writeGitIgnore } from "config_gitignore";
import { writeImportMap } from "config_importmap";
import { writeEntryFile } from "config_entry";
import { IUserConfig } from "../../types/userConfig.type.ts";

export async function buildTask(dmpcPath: string) {
  const _dmpcPath = dmpcPath || path.resolve(process.cwd(), "./dmpc.ts");

  if (!fs.existsSync(_dmpcPath)) {
    console.warn("未找到dmpc.ts配置文件");
    return;
  }

  const root = path.dirname(_dmpcPath);
  const config = await readdmpcTs(_dmpcPath);
  const userConfig = await readUserConfig(config);

  await writeGitIgnore(root, userConfig.outDir);
  await writeImportMap(root, userConfig.importMap);
  await writeUserConfig(root, userConfig as IUserConfig);
  const denoJsoncPath = path.resolve(root, "./deno.jsonc");
  if (!fs.existsSync(denoJsoncPath)) {
    const entryFile = await writedmpcDenoJsonc(root, userConfig.denoJsonc);
    await writeEntryFile(entryFile, userConfig.outDir);
  }

  cp.spawnSync("deno", ["task", "build"], { cwd: root });
  console.log("build done!!!");
}
