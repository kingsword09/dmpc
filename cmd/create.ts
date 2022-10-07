/**
 * create a dnt project
 */

import { Command, Option } from "clipanion";
import * as fs from "node_fs";
import { path } from "path";
import * as process from "node_process";

import { writeDenoJsonc } from "config_deno";
import { writeImportMap } from "config_importmap";

export default class CreateCommand extends Command {
  static paths = [[`create`]];

  name = Option.String();
  version = Option.String("-v, --version");

  async execute() {
    const { existsSync } = fs;
    const { writeFile, mkdir } = fs.promises;

    if (!this.name) {
      throw new Error("not found project name.");
    }

    const root = process.cwd();
    const projectPath = path.resolve(root, this.name);

    if (!existsSync(this.name)) {
      await mkdir(projectPath, { recursive: true });
    }

    // write index.ts entryPoints
    await writeFile(
      path.resolve(projectPath, "index.ts"),
      "export {}",
      "utf-8"
    );
    // write deno.jsonc
    await writeDenoJsonc(projectPath);
    // write import_map.json
    await writeImportMap(projectPath);

    console.log("done!!!");
  }
}
