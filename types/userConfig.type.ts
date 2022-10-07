import type { PackageJson } from "./packageJson.type.ts";

export interface BuildConfig extends Omit<UserConfig, "build"> {}

export interface UserConfig {
  name: string;
  version: string;
  description: string;
  outDir: string;
  importMap: {
    imports: {
      [property: string]: string;
    };
  };
  packageJson: PackageJson;
  build: Partial<BuildConfig>[];
}
