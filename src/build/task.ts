import { path } from "utils_path";
import * as cp from "node_cp";
import * as fs from "node_fs";
import * as process from "node_process";
import { readDmpTs } from "config_userconfig";
import { writeDmpDenoJsonc } from "config_deno";
import { writeGitIgnore } from "config_gitignore";
import { writeImportMap } from "config_importmap";
import { writeEntryFile } from "config_entry";

export async function buildTask(dmpPath: string) {
  const _dmpPath = dmpPath || path.resolve(process.cwd(), "./dmp.ts");

  if (!fs.existsSync(_dmpPath)) {
    console.warn("未找到dmp.ts配置文件");
    return;
  }

  const root = path.dirname(_dmpPath);
  const userConfig = await readDmpTs(_dmpPath);
  const outDir = userConfig.outDir ?? ".npm";
  const importMap = userConfig.importMap;
  const denoJsonc =
    userConfig.denoJsonc ??
    (
      await import("../../assets/denoJsoncTemplate.json", {
        assert: { type: "json" }
      })
    ).default;

  await writeGitIgnore(root, outDir);
  const entryFile = await writeDmpDenoJsonc(root, denoJsonc);
  await writeImportMap(root, importMap);
  await writeEntryFile(entryFile, userConfig);

  cp.spawnSync("deno", ["task", "build"], { cwd: root });
  console.log("build done!!!");
}
