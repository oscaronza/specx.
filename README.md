# SpecX 2.6 — TikTok UFO Banner Update

This is the **complete SpecX website** (not just a code snippet), based on 2.5 with the existing builder, bike carousel, prices, logo and external links intact.

## New: space-themed TikTok transmission banner

- Added a black/chrome scrolling TikTok banner **between the bike configurator and the Resources section** (the area marked red in your screenshot).
- Text scrolls left, disappears off-screen, and seamlessly repeats: **FOLLOW @SPECXEBIKES** and **TAKING E-BIKE MODIFICATIONS TO THE MOON**.
- Clicking the banner or **OPEN TIKTOK** opens `https://www.tiktok.com/@specxebikes` in another tab.
- Added a tilted silver UFO and a subtle downward light beam in the banner's top-right corner, with a few small stars.
- The text pauses when you hover or keyboard-focus the banner. Visitors who prefer reduced motion see a stationary, scrollable version.
- No extra animation package, paid APIs or passwords are required.

## Uploading from Windows to GitHub

1. Download and extract the ZIP.
2. Open your existing `specx` GitHub repository.
3. Upload the **contents** of this folder, replacing existing files: `index.html`, `main.jsx`, `style.css`, `package.json`, `README.md`, plus the `public` folder with its subfolders.
4. Click **Commit changes**. Your connected Vercel project will deploy the new version automatically.
5. Open the latest **Ready** deployment and press **Ctrl+Shift+R** if your browser still shows the previous site.

**Important:** Preserve the folder paths for `public/bikes/` and `public/prices.json` when uploading. Existing local edits to prices may still be present in your browser's local storage; this update does not reset them.

## Running it locally

Install Node.js and from this folder run:

```bash
npm install
npm run dev
```

Open the URL displayed in the terminal (often `http://localhost:5173`). To test the production build, run `npm run build`.

## Notes

The existing third-party bike images may still be blocked by outside image hosts; SpecX uses fallback placeholders for those models. The new TikTok banner and UFO are built entirely with HTML, CSS and SVG and require no external assets.
