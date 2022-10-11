/* eslint-disable */
import { defineConfig, PluginOption } from 'vite';
// import { directoryPlugin } from 'vite-plugin-list-directory-contents';
import { directoryPlugin } from '../../../Sites/vite-plugin-list-directory-contents/plugin';

export default defineConfig({
  // A simple vite config. We are using 1 plugin here so we can visually navigate the directory structure. Funny things here - Vite is whining about the plugin not having the correct params, because their types are missing something. So here we cast it with `as`.
  plugins: [directoryPlugin({ baseDir: __dirname }) as PluginOption],
  server: {
    port: 7777,
    host: true,
  },
});
