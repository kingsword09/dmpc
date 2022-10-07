import { path } from "path";
import { Command, Option } from "clipanion";

export default class BuildCommand extends Command {
  static paths = [[`build`]];

  config = Option.String("-c, --config");

  async execute() {
    const dmpConfig = this.config;
  }
}
