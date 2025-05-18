import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tsconfigPaths from 'vite-tsconfig-paths'
export default () => {

    return defineConfig({
        plugins: [react(), tsconfigPaths(), tailwindcss(), nodePolyfills()],
        envDir: path.resolve(__dirname, '../../'),
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            proxy: {
                '/api': 'http://localhost:4000',
            },
            port: 4000,
            cors: true,
        },
    })
}
