/**
 * Test-only module loader: stubs non-JS asset imports (.mp3, .css) so the
 * real application modules can run under Node/tsx inside jsdom.
 * Registered via test/register.mjs (see `npm run smoke`).
 */
export async function load(url, context, nextLoad) {
  if (url.endsWith('.mp3') || url.endsWith('.css') || url.endsWith('.wav') || url.endsWith('.ogg')) {
    return {
      format: 'module',
      source: 'export default "";',
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}
