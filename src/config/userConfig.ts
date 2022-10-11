import * as fs from "node_fs";
import * as process from "node_process";
import { path } from "utils_path";
import { pathToFileURL } from "node_url";
import { IUserConfig } from "../../types/userConfig.type.ts";

const { writeFile } = fs.promises;

export async function readDmpTs(file: string): Promise<IUserConfig> {
  const url = pathToFileURL(file);
  const userConfig = await import(url.href);

  return userConfig as IUserConfig;
}

export async function writeDmpTs(name: string) {
  const root = process.cwd();
  const file = path.resolve(root, "./dmp.ts");
  const content = `
  import { defineConfig } from "@kingsword/dmp/config";

  export default defineConfig({
    name: "${name}",
    version: "0.0.1",
  });
  `;
  await writeFile(file, content, "utf-8");
}
