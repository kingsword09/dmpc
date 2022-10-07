#!/usr/bin/env node

import * as process from "node_process";
import { Cli, Builtins } from "clipanion";

import NewCommand from "cmd_new";
import BuildCommand from "cmd_build";
import CreateCommand from "cmd_create";

const npmConfig = (await import("../npm.json", { assert: { type: "json" } }))
  .default;

const cli = new Cli({
  binaryLabel: "dmp",
  binaryName: npmConfig.name,
  binaryVersion: npmConfig.version
});

cli.register(NewCommand);
cli.register(BuildCommand);
cli.register(CreateCommand);
cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);

cli.runExit(process.argv.slice(2));
