import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // We use process.cwd() to get the root directory.
  // Typecasting process to any to avoid potential strict type check issues with 'cwd'
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Vital step: Map the API_KEY from Netlify/System env to import.meta.env.VITE_API_KEY
      'import.meta.env.VITE_API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
