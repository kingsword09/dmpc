import * as fs from "node_fs";
import { path } from "utils_path";
import { fileURLToPath } from "node_url";

export async function writeGitIgnore(dest: string, outDir: string) {
  const { writeFile, readFile } = fs.promises;

  const curPath = path.dirname(fileURLToPath(import.meta.url));
  let content = await readFile(
    path.resolve(curPath, "../../assets/.gitignoreTemplate"),
    "utf-8"
  );
  content += `\n ${outDir} \n`;
  await writeFile(path.join(dest, "./.gitignore"), content, "utf-8");

  return;
}
