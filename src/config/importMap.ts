import * as fs from "node_fs";
import { path } from "utils_path";
import { IImportMap } from "../../types/importMap.type.ts";

export async function writeImportMap(dest: string, importMap?: IImportMap) {
  const { writeFile } = fs.promises;
  const fileName = path.resolve(dest, "./import_map.json");
  let _importMap = "";

  if (importMap) {
    if (!importMap.imports?.["dnt"]) {
      importMap.imports["dnt"] = "https://deno.land/x/dnt/mod.ts";
    }
    _importMap = JSON.stringify(importMap);
  } else {
    _importMap = `
    {
      "imports": {
        "dnt": "https://deno.land/x/dnt/mod.ts"
      }
    }
  `;
  }

  await writeFile(fileName, _importMap, "utf-8");

  return;
}
