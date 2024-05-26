import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: '10.0.0.194',
      port: 3000,
    },
    define: {
      'process.env.API_ENDPOINT': JSON.stringify(env.API_ENDPOINT),
    },
    plugins: [react()],
  };
});
