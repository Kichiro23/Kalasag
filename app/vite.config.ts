import path from "path"
const __dirname = import.meta.dirname
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const isDev = command === 'serve'
  const plugins = [react()]

  if (isDev) {
    const devServer = (await import("@hono/vite-dev-server")).default
    const { inspectAttr } = await import('kimi-plugin-inspect-react')
    plugins.unshift(inspectAttr())
    plugins.unshift(devServer({ entry: "api/boot.ts", exclude: [/^\/(?!api\/).*$/] }))
  }

  return {
    plugins,
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@contracts": path.resolve(__dirname, "./contracts"),
        "@db": path.resolve(__dirname, "./db"),
        "db": path.resolve(__dirname, "./db"),
      },
    },
    envDir: path.resolve(__dirname),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
  }
})
