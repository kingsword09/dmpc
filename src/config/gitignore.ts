import * as fs from "node_fs";
import { path } from "utils_path";

export async function writeGitIgnore(dest: string, outDir: string) {
  const { writeFile, readFile } = fs.promises;

  let content = await readFile("../../.gitignore", "utf-8");
  content += `\n ${outDir} \n`;
  await writeFile(path.join(dest, "./.gitignore"), content, "utf-8");

  return;
}
