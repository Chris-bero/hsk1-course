#!/usr/bin/env python3
"""
inline_preview.py — low-memory equivalent of `npm run build:preview`.

vite-plugin-singlefile needs a lot of RAM to inline 1276 mp3 clips (~24 MB of
base64) and can get OOM-killed in constrained sandboxes. This script does the
same job from an already-built `dist/` (regular `npm run build`), streaming
nothing but strings Python handles easily:

  1. read dist/index.html, dist/assets/index-*.js and dist/assets/index-*.css
  2. replace every  ""+new URL("<clip>.mp3",import.meta.url).href  expression
     in the bundle with a "data:audio/mpeg;base64,…" literal
  3. inline the JS and CSS into the HTML shell
  4. write preview-dist/index.html

Usage:  npm run build && python3 scripts/inline_preview.py
Output is byte-for-byte equivalent in behaviour to the vite preview build.
"""
import base64
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
OUT = os.path.join(ROOT, "preview-dist", "index.html")

AUDIO_REF = re.compile(r'""\+new URL\("(hsk1-[^"]+?\.mp3)",import\.meta\.url\)\.href')


def main() -> int:
    if not os.path.isdir(DIST):
        print("dist/ not found — run `npm run build` first.", file=sys.stderr)
        return 1
    html = open(os.path.join(DIST, "index.html"), encoding="utf-8").read()
    js_path = glob.glob(os.path.join(DIST, "assets", "index-*.js"))[0]
    css_path = glob.glob(os.path.join(DIST, "assets", "index-*.css"))[0]
    js = open(js_path, encoding="utf-8").read()
    css = open(css_path, encoding="utf-8").read()

    refs = sorted(set(AUDIO_REF.findall(js)))
    missing = [r for r in refs if not os.path.exists(os.path.join(DIST, "assets", r))]
    if missing:
        print(f"missing {len(missing)} audio files in dist/assets (e.g. {missing[0]})", file=sys.stderr)
        return 1

    def repl(m: re.Match) -> str:
        b64 = base64.b64encode(open(os.path.join(DIST, "assets", m.group(1)), "rb").read()).decode()
        return '"data:audio/mpeg;base64,' + b64 + '"'

    js = AUDIO_REF.sub(repl, js)

    html = re.sub(r'<link[^>]+href="(?:\./)?/?assets/[^"]+\.css"[^>]*>', lambda _: "<style>\n" + css + "\n</style>", html, count=1)
    html = re.sub(r'<script[^>]+src="(?:\./)?/?assets/[^"]+\.js"[^>]*>\s*</script>', lambda _: '<script type="module">\n' + js + "\n</script>", html, count=1)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html)
    size_mb = os.path.getsize(OUT) / 1e6
    print(f"wrote {OUT} — {size_mb:.1f} MB, {len(refs)} audio clips inlined")
    return 0


if __name__ == "__main__":
    sys.exit(main())
