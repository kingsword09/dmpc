import * as fs from "node_fs";
import { path } from "path";
import type { PackageJson } from "../../types/packageJson.type.ts";

export async function writePakcageJson(dest: string, packageJson: PackageJson) {
  const { writeFile } = fs.promises;
  const fileName = path.resolve(dest, "./package.json");
  await writeFile(fileName, JSON.stringify(packageJson), "utf-8");

  return;
}
