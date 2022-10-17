import { DenoJsonc } from "./denoJsonc.type.ts";
import type { BuildOptions } from "dnt";
import "deno-types";

type PlatformType = "node" | "browser";
export interface IBuildConfig extends Omit<IUserConfig, "build"> {
  platform?: PlatformType;
}

export interface IUserConfig extends Omit<BuildOptions, "importMap"> {
  name: string;
  version: string;
  description?: string;
  outDir: string;
  importMap?: {
    imports: {
      [property: string]: string;
    };
  };
  denoJsonc?: DenoJsonc;
  build?: IBuildConfig[];
}
