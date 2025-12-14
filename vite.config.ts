import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Quando o frontend requisitar /api/tabua-mare/...
      '/api/tabua-mare': {
        // O proxy irá reencaminhar para a API externa
        target: 'https://tabuamare.devtu.qzz.io/api/v1',
        changeOrigin: true,
        // Reescreve a URL para remover o prefixo /api
        rewrite: (path) => path.replace(/^\/api\/tabua-mare/, ''),
        secure: false, // Se o target for HTTPS (como é), use false.
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
