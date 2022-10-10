import * as fs from "node_fs";
import { IUserConfig } from "../../types/userConfig.type.ts";

export async function writeEntryFile(
  entryFile: string,
  userConfig: IUserConfig
) {
  const { writeFile } = fs.promises;
  const content = `
  import { build, type BuildOptions, emptyDir } from "dnt";

  if(import.meta.main) {
    emptyDir("${userConfig.outDir}");
    await build({
      importMap: "./import_map.json",
      entryPoints: ${userConfig.entryPoints},
      outDir: "${userConfig.outDir}",
      typeCheck: true,
      scriptModule: false,
      shims: {
        deno: "dev"
      },
      compilerOptions: {
        target: "Latest",
        importHelpers: true
      },
      packageManager: "yarn",
      package: ${userConfig.packageJson}
    });
  }
  `;

  await writeFile(entryFile, content, "utf-8");

  return;
}
