import * as fs from "node_fs";
import { path } from "path";

export async function writeImportMap(dest: string) {
  const { writeFile } = fs.promises;
  const fileName = path.resolve(dest, "./import_map.json");
  const importMap = `
    {
      "imports": {}
    }
  `;

  await writeFile(fileName, importMap, "utf-8");

  return;
}
