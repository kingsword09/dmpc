import { Command, Option } from "clipanion";

export default class CreateCommand extends Command {
  static paths = [[`create`]];

  name = Option.String();

  async execute() {
    console.log("CreateCommand");
  }
}
