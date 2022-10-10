import { path } from "utils_path";
import * as process from "node_process";
import { Command, Option } from "clipanion";
import { buildTask } from "build_task";

export default class BuildCommand extends Command {
  static paths = [[`build`]];

  config = Option.String("-c, --config");

  async execute() {
    const dmpJsonPath = this.config
      ? path.resolve(process.cwd(), this.config)
      : "";

    await buildTask(dmpJsonPath);
  }
}
