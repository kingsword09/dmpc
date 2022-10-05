import * as fs from "node_fs";
import { path } from "path";

export async function writeImportMap(root: string) {
  const { writeFile } = fs.promises;
  const fileName = path.resolve(root, "./import_map.json");
  const importMap = `
    {
      "imports": {}
    }
  `;

  await writeFile(fileName, importMap, "utf-8");

  return;
}
