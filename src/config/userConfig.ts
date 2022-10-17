import * as fs from "node_fs";
import * as cp from "node_cp";
import * as process from "node_process";
import { path } from "utils_path";
import { pathToFileURL } from "node_url";
import { writePakcageJson } from "config_packagejson";
import { IUserConfig } from "../../types/userConfig.type.ts";

const { existsSync } = fs;
const { writeFile, mkdir, copyFile, rm } = fs.promises;

export async function readdmpcTs(file: string): Promise<IUserConfig> {
  // TODO(@kingsword09): 有待改进
  const tempFile = file.replace(".ts", ".mjs");
  await copyFile(file, tempFile);
  const url = pathToFileURL(tempFile);
  const { default: userConfig } = await import(url.href);
  await rm(tempFile, { force: true });

  return userConfig as IUserConfig;
}

export async function writedmpcTs(name: string) {
  const { default: npmConfig } = await import("../../npm.json", {
    assert: { type: "json" }
  });
  const root = path.join(process.cwd(), name);

  if (existsSync(root)) {
    console.warn(`${name} exists!!!`);
    return;
  }

  await mkdir(root, { recursive: true });
  const file = path.resolve(root, "./dmpc.ts");
  const content = `
  import { defineConfig } from "@kingsword/dmpc/config";

  export default defineConfig({
    name: "${name}",
    version: "0.0.1",
    outDir: ".npm"
  });
  `;
  await writeFile(file, content, "utf-8");

  cp.spawnSync("npm", ["init", "-y"], { cwd: root });
  const packageJson = (
    await import(path.join(root, "./package.json"), {
      assert: { type: "json" }
    })
  ).default;
  packageJson.name = name;
  packageJson.devDependencies = {
    "@kingsword/dmpc": `^${npmConfig.version}`
  };

  await writePakcageJson(root, packageJson);
  cp.spawnSync("npm", ["i"], { cwd: root });

  console.log("done!!!");
}

export async function readUserConfig(config: IUserConfig) {
  config.outDir ?? (config.outDir = ".npm");

  const buildOptions = (
    await import("../../assets/buildOptionsTemplate.json", {
      assert: { type: "json" }
    })
  ).default;
  const packageJson = (
    await import(path.join(process.cwd(), "./package.json"), {
      assert: { type: "json" }
    })
  ).default;

  const userConfig = {
    ...buildOptions,
    ...config,
    package: {
      ...packageJson,
      ...config.package
    }
  };

  return userConfig;
}

export async function writeUserConfig(dest: string, userConfig: IUserConfig) {
  const fileName = path.join(dest, "./dmpc.json");

  await writeFile(fileName, JSON.stringify(userConfig), "utf-8");
}
