import * as fs from "node_fs";
import { IUserConfig } from "../../types/userConfig.type.ts";

export async function writeEntryFile(
  entryFile: string,
  userConfig: IUserConfig
) {
  const { writeFile } = fs.promises;

  // TODO: 处理多个入口
  // const content = `
  // import { build, type BuildOptions, emptyDir } from "dnt";

  // if(import.meta.main) {
  //   emptyDir("${userConfig.outDir}");

  //   for (const buildPartial of userConfig.build) {
  //     let buildConfig = {
  //       ${...userConfig}
  //     };
  //     await build(${});
  //   }
  // }
  // `;

  await writeFile(entryFile, content, "utf-8");

  return;
}
