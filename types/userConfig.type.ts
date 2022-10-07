export interface BuildConfig extends Omit<UserConfig, "build"> {}

export interface UserConfig {
  name: string;
  version: string;
  description: string;
  outDir: string;
  importMap: string;
  build: Partial<BuildConfig>[];
}
