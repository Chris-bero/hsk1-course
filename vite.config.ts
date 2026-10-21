import { defineConfig } from 'vite';

// Removes the file:// guard script from built HTML (it is only meant for the
// source entry that people might double-click).
const stripFileGuard = {
  name: 'strip-file-guard',
  transformIndexHtml(html: string): string {
    return html.replace(/\s*<script id="file-guard">[\s\S]*?<\/script>/, '');
  },
};

// Production build: static site, relative asset paths so it can be hosted
// anywhere (GitHub Pages subpath, Netlify, plain file server, etc.).
// Audio clips are emitted as separate files under dist/assets/audio-*.
export default defineConfig({
  base: './',
  plugins: [stripFileGuard],
  build: {
    outDir: 'dist',
    target: 'es2020',
  },
});
