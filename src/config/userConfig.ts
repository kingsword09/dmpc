import * as fs from "node_fs";
import * as cp from "node_cp";
import * as process from "node_process";
import { path } from "utils_path";
import { pathToFileURL } from "node_url";
import { writePakcageJson } from "config_packagejson";
import { IUserConfig } from "../../types/userConfig.type.ts";

const { existsSync } = fs;
const { writeFile, mkdir, copyFile, rm } = fs.promises;

export async function readDmpTs(file: string): Promise<IUserConfig> {
  // TODO(@kingsword09): 有待改进
  const tempFile = file.replace(".ts", ".mjs");
  await copyFile(file, tempFile);
  const url = pathToFileURL(tempFile);
  const { default: userConfig } = await import(url.href);
  await rm(tempFile, { force: true });

  return userConfig as IUserConfig;
}

export async function writeDmpTs(name: string) {
  const root = path.join(process.cwd(), name);

  if (existsSync(root)) {
    console.warn(`${name} exists!!!`);
    return;
  }

  await mkdir(root, { recursive: true });
  const file = path.resolve(root, "./dmp.ts");
  const content = `
  import { defineConfig } from "@kingsword/dmp/config";

  export default defineConfig({
    name: "${name}",
    version: "0.0.1",
  });
  `;
  await writeFile(file, content, "utf-8");

  // const packageJson = (
  //   await import("../../assets/packageJsonTemplate.json", {
  //     assert: { type: "json" }
  //   })
  // ).default;
  cp.spawnSync("npm", ["init", "-y"], { cwd: root });
  const packageJson = (
    await import(path.join(root, "./package.json"), {
      assert: { type: "json" }
    })
  ).default;
  packageJson.name = name;
  packageJson.devDependencies = {
    "@kingsword/dmp": "file:/Users/biyou/src/github/dmp/.npm"
  };

  await writePakcageJson(root, packageJson);
  cp.spawnSync("npm", ["i"], { cwd: root });

  console.log("done!!!");
}
