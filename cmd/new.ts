/**
 * create a dmpc project
 */

import { Command, Option } from "clipanion";
import { writedmpcTs } from "config_userconfig";

export default class NewCommand extends Command {
  static paths = [[`new`]];

  name = Option.String({ required: true });

  async execute() {
    console.log(this.name);
    await writedmpcTs(this.name);
  }
}
