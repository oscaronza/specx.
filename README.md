# SpecX

A working React + Vite electric bike configurator with a rotatable procedural 3D concept bike, customisation categories, live AUD estimates, and downloadable build summaries.

## Requirements
- Node.js 20.19+ or 22.12+ (Vite 6)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed in your terminal (typically http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
Deploy the generated `dist/` directory to a static host (Netlify, Vercel, Cloudflare Pages, etc.).

## Edit the catalogue
Update the `bikes`, `categories`, and `palette` arrays in `src/main.jsx`.

## Important limitations
- Prices are **illustrative AUD placeholders**, not real supplier quotes.
- The 3D bike is a **stylised, procedural concept**, not an exact CAD/photogrammetry model of each brand. The chosen model changes the label and base price; a few styling details vary. To show exact bike models and realistic parts, obtain properly licensed GLB/GLTF assets and build model-specific meshes and compatible part variants.
- Powder coat colour swatches preview frame colour; the selected powder-coating service price is separate.
- Compatibility, local road rules, stock, labour and delivery have not been verified. This is a concept app, not a commercial parts ordering system.
