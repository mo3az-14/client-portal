import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {

    const env = loadEnv(mode, process.cwd(), '');

    return defineConfig({
        plugins: [react(), tailwindcss(), nodePolyfills()],
        define: {
            'process.env.SERVER_URL': JSON.stringify(env.SERVER_URL),
            'process.env.CLIENT_PORT': JSON.stringify(env.CLIENT_PORT)
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            port: Number(env.CLIENT_PORT) || 5173,
            proxy: {
                '/api': {
                    target: env.SERVER_URL,
                    changeOrigin: true,

                }
            }
        },
    })
}
