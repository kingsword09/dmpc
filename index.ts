import { build, emptyDir, type BuildOptions } from "dnt";
import { watcher } from "deno_watcher";
import npmConfig from "./npm.json" assert { type: "json" };

export const buildOptions: BuildOptions = {
  importMap: npmConfig.importMap,
  entryPoints: [
    {
      kind: "bin",
      name: "dmpc",
      path: "./bin/dmpc.cmd.ts"
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
      url: "git+https://github.com/kingsword09/dmpc.git"
    },
    bugs: {
      url: "https://github.com/kingsword09/dmpc/issues"
    },
    devDependencies: {
      "@types/node": "latest",
      "deno-types": "^1.25.0"
    },
    typesVersions: {
      ">3.1": {
        config: ["types/src/config"]
      }
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
