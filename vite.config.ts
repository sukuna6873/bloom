import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Replit assigns a random hostname per Repl/session (e.g.
      // <uuid>.sisko.replit.dev), so allow the whole domain instead of a
      // single host that would break on the next session. A leading dot
      // means "this domain and any subdomain" in Vite's allowedHosts.
      allowedHosts: ['.replit.dev', '.replit.run', '.replit.co'],
      // HMR configuration
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
