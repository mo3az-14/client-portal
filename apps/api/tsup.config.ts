import { defineConfig } from "tsup";

export default defineConfig({
    name: "api",
    entry: ["src/index.ts"],
    outDir: "dist",
    clean: true,
    format: ["cjs", "esm"],
    shims: false,
    minify: true,
    sourcemap: true,
    splitting: false,
});
