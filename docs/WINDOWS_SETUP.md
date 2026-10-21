# Windows Setup — fixing "npm is not recognized"

**Symptom (PowerShell):**

```
npm : The term 'npm' is not recognized as the name of a cmdlet, function,
script file, or operable program.
```

**Cause:** Node.js is not installed (or not on PATH). `npm` ships *with* Node.js —
installing the project's dependencies requires it once per machine.

## A. View the site with zero installation

Double-click `preview-dist\index.html` — the whole course site in one
self-contained file (JS/CSS/audio inlined). Works offline, no server needed.
(Progress storage may be limited when opened in sandboxed/embedded viewers;
in a normal browser it persists in localStorage.)

> ⚠️ Do **not** double-click the root `index.html` — that is the *source* entry
> (TypeScript + ES modules) and shows a blank page without a build. It now
> auto-forwards to `preview-dist\index.html` when opened from disk, but use the
> preview file directly.

## B. Install Node.js (for dev/build/test commands)

1. Download the **LTS** `.msi` installer from <https://nodejs.org> (Node 20/22+).
2. Run it with default options — keep *"Add to PATH"* enabled (default).
3. **Close every PowerShell/terminal window**, open a new one.
4. Verify:
   ```powershell
   node -v
   npm -v
   ```
5. Install & run:
   ```powershell
   cd <unzip-folder>\hsk1-site
   npm install
   npm run dev        # http://localhost:5173
   npm run build      # production build → dist\
   npm run smoke      # 63-check verification (no browser needed)
   ```

### If npm is still not recognized after installing

- Restart Windows once (PATH refresh), or
- Use the **"Node.js command prompt"** from the Start menu, or
- Check Environment Variables: `C:\Program Files\nodejs\` must be in `Path`
  (Settings → System → About → Advanced system settings → Environment Variables), or
- Re-run the installer and choose *Repair*.

## C. Publish without Node at all

The site is fully static:

- Drag the `dist\` folder onto <https://app.netlify.com/drop>, or
- Upload `dist\` contents to GitHub Pages / any static host, or
- Serve locally with Python: `cd dist; python -m http.server` then open
  <http://localhost:8000>.

Audio files are part of the build — nothing external is required at runtime.
