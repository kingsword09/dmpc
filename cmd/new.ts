/**
 * create a dmp project
 */

import { Command, Option } from "clipanion";
import { writeDmpJson } from "config_userconfig";

export default class NewCommand extends Command {
  static paths = [[`new`]];

  name = Option.String();
  version = Option.String("-v, --version");
  description = Option.String("-d, --description");
  out = Option.String("-o, --out");

  async execute() {
    await writeDmpJson({
      name: this.name,
      versoin: this.version,
      description: this.description,
      outDir: this.out
    });
  }
}
