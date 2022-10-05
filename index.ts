import { build, type BuildOptions, emptyDir } from "dnt";

const npmConfig = (await import("./npm.json", { assert: { type: "json" } }))
  .default;

export const buildOptions: BuildOptions = {
  importMap: npmConfig.importMap,
  entryPoints: [
    {
      kind: "bin",
      name: "dmp",
      path: "./bin/dmp.cmd.ts"
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
      "@types/node": "latest"
    }
  }
};

if (import.meta.main) {
  emptyDir("./.npm");
  await build(buildOptions);
}
