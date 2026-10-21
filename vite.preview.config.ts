import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Removes the file:// guard script from built HTML (the preview IS the
// double-clickable file; the guard must not fire inside it).
const stripFileGuard = {
  name: 'strip-file-guard',
  transformIndexHtml(html: string): string {
    return html.replace(/\s*<script id="file-guard">[\s\S]*?<\/script>/, '');
  },
};

// Preview build: a single self-contained HTML file with ALL assets inlined
// (JS, CSS, and audio as data URIs). Used so the site can be previewed in
// environments without network/static-file access (e.g. an in-app viewer).
// NOT for production — use the regular build (vite.config.ts) for hosting.
export default defineConfig({
  base: './',
  plugins: [viteSingleFile(), stripFileGuard],
  build: {
    outDir: 'preview-dist',
    target: 'es2020',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
});
