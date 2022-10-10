import type { PackageJson } from "./packageJson.type.ts";

export interface BuildConfig extends Omit<IUserConfig, "build"> {}

export interface IEntryPoint {
  /**
   * If the entrypoint is for an npm binary or export.
   * @default "export"
   */
  kind?: "bin" | "export";
  /** Name of the entrypoint in the "binary" or "exports". */
  name: string;
  /** Path to the entrypoint. */
  path: string;
}

export interface IUserConfig {
  name: string;
  version: string;
  description: string;
  entryPoints: (string | IEntryPoint)[];
  outDir: string;
  importMap: {
    imports: {
      [property: string]: string;
    };
  };
  packageJson: PackageJson;
  build: Partial<BuildConfig>[];
}
