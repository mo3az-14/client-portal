import { defineConfig } from 'tsup';

export default defineConfig({
    // Entry point for your package
    entry: ['src/index.ts'],

    // Output directory
    outDir: 'dist',

    // Build both ESM and CJS formats for interoperability
    format: ['esm', 'cjs'],


    // Enable source maps for easier debugging
    sourcemap: true,

    // Clean the outDir before each build
    clean: true,


    // Don't bundle peerDependencies — keep them external
    external: [
        'drizzle-orm',
        'drizzle-zod',
        'zod'
    ],

    // Target a modern Node runtime; adjust if you need broader browser support
    target: 'es2020',

    // No code splitting needed for libraries
    splitting: false,

    // Keep the package name consistent when logging
    name: '@client-portal/db'
});
