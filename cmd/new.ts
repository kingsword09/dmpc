/**
 * create a dmp project
 */

import { Command, Option } from "clipanion";
import { writeDmpTs } from "config_userconfig";

export default class NewCommand extends Command {
  static paths = [[`new`]];

  name = Option.String("", { required: true });

  async execute() {
    await writeDmpTs(this.name);
  }
}
