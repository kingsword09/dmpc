import * as fs from "node_fs";
import * as process from "node_process";
import { path } from "path";
import { UserConfig, BuildConfig } from "../types/userConfig.type.ts";

export async function writeDmpJson(options: BuildConfig) {
  const name = options?.name ?? "demo";
  const version = options?.version ?? "0.0.1";
  const description = options?.description ?? "";
  const outDir = options?.outDir ?? ".npm";

  const { writeFile } = fs.promises;
  const root = process.cwd();
  const file = path.resolve(root, "./dmp.json");
  const content = `
  {
    "name": ${name},
    "version": ${version},
    "description": ${description},
    "outDir": ${outDir},
    "importMap": {
      "imports": {}
    },
    "packageJson": {}
  }
  `;

  await writeFile(file, content, "utf-8");

  return;
}

export async function readDmpJson(file: string): Promise<UserConfig> {
  const userConfig = (await import(file, { assert: { type: "json" } })).default;

  return userConfig as UserConfig;
}
