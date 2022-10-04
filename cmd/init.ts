import { Command, Option } from "clipanion";

export default class InitCommand extends Command {
  static paths = [[`init`]];

  name = Option.String();

  async execute() {
    console.log("InitCommand");
  }
}
