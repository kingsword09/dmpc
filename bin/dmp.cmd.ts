#!/usr/bin/env node

import * as process from "node_process";
import { Cli, Builtins } from "clipanion";

import InitCommand from "cmd_init";
import BuildCommand from "cmd_build";

const npmConfig = (await import("../npm.json", { assert: { type: "json" } }))
  .default;

const cli = new Cli({
  binaryLabel: "dmp",
  binaryName: npmConfig.name,
  binaryVersion: npmConfig.version
});

cli.register(InitCommand);
cli.register(BuildCommand);
cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);

cli.runExit(process.argv.slice(2));
