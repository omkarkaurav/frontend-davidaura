import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Add React plugin

export default defineConfig({
  base: "./",
  plugins: [react()], // Use React plugin
})
