import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Example of using a named import if the plugin exports it this way
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),nodePolyfills(),    NodeModulesPolyfillPlugin()],
  resolve: {

  },
  // define: {
  //   'global': {},
  //   'process.env': {}
  // },
  server: {
    host: true,
  },
});
