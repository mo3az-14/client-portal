import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tsconfigPaths from 'vite-tsconfig-paths'
// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {

    const env = loadEnv(mode, process.cwd(), "VITE_")

    return defineConfig({
        plugins: [react(), tsconfigPaths(), tailwindcss(), nodePolyfills()],

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
            preserveSymlinks: true,
        },
        server: {
            fs: {
                allow: [
                    path.resolve(__dirname, '../..')
                ]
            },
            port: 5173,
            proxy: {
                '/api': {
                    target: env.VITE_SERVER_URL,
                    changeOrigin: true,
                },
            },
            cors: true,
        },
    })
}
