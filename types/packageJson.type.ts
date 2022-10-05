const packageJsonConfig = (
  await import("../assets/packageJsonTemplate.json", {
    assert: { type: "json" }
  })
).default;

export type PackageJson = typeof packageJsonConfig;
