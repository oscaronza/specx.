# SpecX 2.5 — Image Reliability Fix

This update fixes missing logo images and reduces the number of broken showroom photos.

**What changed**
- The SpecX moon logo is embedded directly in `main.jsx` for navbar, footer and banner. It no longer relies on `/public/specx-logo.webp` being uploaded correctly.
- The browser tab icon is embedded directly in `index.html`.
- The owner's Surron Light Bee X side-profile photo is embedded directly in `main.jsx`.
- Other models have backup photographic image URLs; if they are unavailable, the website displays a clean branded fallback rather than a broken photo.
- All existing models, upgrade options, slideshow, AUD pricing and TikTok links are preserved.

**On Windows / GitHub**
1. Download and extract `specx-2.5-image-fix.zip`.
2. Open your existing SpecX GitHub repository and upload the files in this folder. Replace the existing `index.html`, `main.jsx`, `style.css` and `package.json`.
3. For complete functionality, upload the `public` folder too. The folder must appear as `public/prices.json`, `public/specx-logo.webp`, and `public/bikes/surron-lightbee-cutout.png` in GitHub. GitHub's web uploader may need files dragged from Windows File Explorer, or the individual paths created.
4. Commit the changes. Vercel redeploys automatically.
5. Open the newest green **Ready** deployment and press **Ctrl + Shift + R**.

**Note:** Some manufacturers' product photographs are hosted by third-party websites and may still be blocked or moved. The new fallback makes this failure visible without showing broken HTML image icons. For permanent, accurate bike photos, add appropriately licensed model-specific photographs to `public/bikes/` and change the `image` URL for each bike in `main.jsx` (e.g. `image:'/bikes/talaria-mx4.webp'`). Do not label the fallback as a genuine photograph of the chosen model.

**Local testing:** Install Node.js, open this folder in Command Prompt, run `npm install` and `npm run dev`. For a production check run `npm run build`.
