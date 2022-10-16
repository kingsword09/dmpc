import { build, emptyDir, type BuildOptions } from "dnt";
import { watcher } from "deno_watcher";
import npmConfig from "./npm.json" assert { type: "json" };

export const buildOptions: BuildOptions = {
  importMap: npmConfig.importMap,
  entryPoints: [
    {
      kind: "bin",
      name: "dmp",
      path: "./bin/dmp.cmd.ts"
    },
    {
      kind: "export",
      name: "./config",
      path: "./src/config/index.ts"
    }
  ],
  outDir: npmConfig.outDir,
  typeCheck: true,
  scriptModule: false,
  shims: {
    deno: "dev"
  },
  compilerOptions: {
    target: "Latest",
    importHelpers: true
  },
  packageManager: "yarn",
  package: {
    name: npmConfig.name,
    version: npmConfig.version,
    description: npmConfig.description,
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/kingsword09/dmp.git"
    },
    bugs: {
      url: "https://github.com/kingsword09/dmp/issues"
    },
    dependencies: {
      clipanion: "^3.2.0-rc.12"
    },
    devDependencies: {
      "@types/node": "latest",
      "deno-types": "^1.25.0"
    }
  }
};

async function buildTask() {
  emptyDir("./.npm");
  await build(buildOptions);
  await Deno.copyFile("./LICENSE", "./.npm/LICENSE");
  await Deno.copyFile("./README.md", "./.npm/README.md");
  await Deno.copyFile("./.gitignore", "./.npm/.gitignore");
}

if (import.meta.main) {
  if (Deno.env.get("mode") === "dev") {
    await watcher(buildTask, ["."], {
      timeout: 5000,
      exclude: [".npm", "bin"]
    });
  } else {
    await buildTask();
  }
}
