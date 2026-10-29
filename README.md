# SpecX 2.4 — Space Edition (logo fix)

A monochrome, space-inspired electric-bike configurator. Built using React + Vite, with **no paid AI service, password or API key**.

## What's new
- Surron expands to **Light Bee X**, **Ultra Bee**, **Storm Bee**, and **Hyper Bee**, selectable under the Surron brand. Other brands remain.
- The main Surron Light Bee image uses a **real transparent cutout**, created from the image screenshot you supplied. The 2D showroom has a dark starfield finish instead of the white background.
- Other third-party reference images get **best-effort free background removal in your browser** when the image host allows it. If a provider blocks canvas access or the photo isn't a light neutral studio shot, the original photo is displayed instead. For reliable full transparency, supply your own transparent-background `.png` in `public/bikes/` and edit the matching `image` entry in `main.jsx`.
- No AI generating/editing photos or asking for passcodes. Selected parts are not visually fitted to bike photos.
- Brand-selection accordion groups **models under brands**, and actual manufacturer/distributor/parts websites are linked. These aren't endorsements or fitment confirmations.
- Price editing, shared links, free build sheet, bike slideshow, TikTok, animations and responsive design remain.

## Run on Windows
1. Download Node.js (LTS) from https://nodejs.org/ and install it.
2. Extract the ZIP and open PowerShell or Windows Terminal inside the extracted folder.
3. Run `npm install` followed by `npm run dev`.
4. Open the local URL displayed (usually http://localhost:5173/).

## Publish on GitHub and Vercel
1. In your existing `specx` GitHub repository, replace your old root files with these: `index.html`, `main.jsx`, `style.css`, `package.json`, `README.md`.
2. Upload the `public` folder **including** `bikes/surron-lightbee-cutout.png`, `favicon.png`, `specx-logo.webp`, `prices.json`. If GitHub's browser upload flattens folders, open each folder and upload there separately or use GitHub Desktop.
3. Remove old `api/` and `.env` files if still present; this free version does not use them.
4. Commit changes; Vercel automatically rebuilds. Vite project, root `./`, build command `npm run build`, output `dist`.
5. **Hard refresh** your website (Ctrl+Shift+R) after deployment.

## Customise
- Bike data and `image`, `source`, `site` URLs: first section of `main.jsx`.
- External website URLs: `brandSites` and `partSites` in `main.jsx`.
- Default public estimates: `public/prices.json` (all USD listings elsewhere are *not* used as AUD prices).
- Prices entered through **EDIT PRICES** save only in the editor's browser unless you export a `prices.json` and publish it on GitHub.

## Accuracy / photo rights
- All prices are illustrative AUD estimates, **not verified prices**. Fitment and road rules depend on the exact model, part and location.
- SpecX is independent of the bike and parts manufacturers. External reference photos may require permission before commercial use, and third-party URLs may become unavailable.
- For the best-looking showroom, replace other brands' external images with your own transparent bike PNGs. The Surron Light Bee cutout is cropped from the screenshot you uploaded to this conversation.
- External links are educational product references; no checkout or purchase integration exists.

## Logo visible in header and footer
This update shows your moon logo in the top navigation, existing homepage bottom banner, and footer. It is also included as the favicon. All other functionality remains from 2.4.
