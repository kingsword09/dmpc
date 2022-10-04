import { path } from "path";
import { Command, Option } from "clipanion";

export default class BuildCommand extends Command {
  static paths = [[`build`]];

  async execute() {
    console.log("BuildCommand:  " + path.join(process.cwd(), "bin"));
  }
}
