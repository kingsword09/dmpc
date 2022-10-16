import * as fs from "node_fs";

const { writeFile } = fs.promises;

export async function writeEntryFile(entryFile: string, outDir: string) {
  const content = `
  import { build, emptyDir, type BuildOptions } from "dnt";
  import userConfig from "./dmp.json" assert { type: "json" };
  
  if(import.meta.main) {
    emptyDir("${outDir}");

    const buildConfig = {
      ...userConfig,
      importMap: "./import_map.json"
    };
    
    await build(buildConfig as BuildOptions);
  }
  `;

  await writeFile(entryFile, content, "utf-8");

  return;
}
