const denoJsoncConfig = (
  await import("../assets/denoJsoncTemplate.json", { assert: { type: "json" } })
).default;

export type DenoJsonc = typeof denoJsoncConfig;
