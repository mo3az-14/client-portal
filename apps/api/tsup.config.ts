import { defineConfig } from "tsup";

export default defineConfig({
    name: "frontline",
    entry: ["src/server.ts"],
    outDir: "dist",
    clean: true,
    format: ["cjs", "esm"],
    shims: false,
    minify: true,
    sourcemap: true,
    splitting: false,
});
