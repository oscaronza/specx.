# SpecX 3.0 — Space Edition / Global Currency

**Taking e-bike modifications to the moon.** This is the full frontend source for SpecX 3.0, built with React and Vite. It updates the existing SpecX site; **do not make a new repository**.

## What's new in 3.0

- **Cinematic, black-and-white space homepage:** enormous moon, layered stars, occasional shooting stars, subtle scrolling parallax, polished buttons. A "Pause Space FX" control stops the ambient effects. The bike showcase still slides between models and has its own pause button. Reduced-motion settings are respected.
- **Fixed TikTok broadcast:** a slim, scrolling `@specxebikes` strip stays at the very top as visitors scroll. The small silver UFO is angled downward at the top right. The strip can be dismissed for this browser tab.
- **Worldwide currency picker:** users choose a currency (USD, EUR, GBP, AUD, NZD, INR, JPY, and other currencies supported by their browser). **No paid exchange-rate subscription or API key.**
- **Free, guest-mode build saves:** on the Build Sheet, select **SAVE ON THIS DEVICE**, then use **MY SAVED BUILDS** to return to it later. Supports up to 12 local builds. Share links still work. No login required.
- Existing 10 bike entries, upgrade categories, editable prices, upload-your-own-bike-photo, resources, logo, and TikTok integration preserved.
- **No AI generator or password**. No community gallery.

## Important: how worldwide pricing works

Base bike and part prices are **demo estimates stored in AUD** (including prices you enter through **EDIT PRICES**). Visitors choose their display currency from the header. The app converts AUD estimates using **daily, public exchange-reference data** from the free, keyless [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api) with the documented CDN and backup Cloudflare-hosted feed.

- FX values may not reflect today's retail prices, shipping, regional taxes, customs, or part availability. **The currency selector does not change pricing by country**; it converts the AUD estimates using reference rates. Convert-only is intentional and prevents made-up country-specific price lists.
- The latest fetched rates are cached in the visitor's browser for temporary offline fallback (up to 36 hours). If both providers are inaccessible and no cached rates exist, the website **clearly shows AUD instead of inventing conversion rates**.
- Currency and build choice are remembered in the visitor's browser. A share URL can include the selected currency. Exported `prices.json` files **stay in AUD** so you can publish one common price list on GitHub.
- Visitors need an internet connection for exchange rates (but *not* a paid API key). The rest of the configurator works without the exchange-rate service.

## Updating your existing SpecX website on Windows

1. Download **specx-3.0.zip**, then right-click > **Extract All**.
2. Open your existing GitHub `specx` repository (the one connected to Vercel).
3. Upload/replace the **contents** of the extracted folder, not the ZIP itself. Keep `index.html`, `main.jsx`, `style.css`, `package.json`, `README.md` and the `public/` files in their existing positions. The site starts at `/main.jsx` (not `/src/main.jsx`).
4. Commit your changes. Open Vercel > Deployments and find the newest deployment marked **Ready**. On Windows press `Ctrl+Shift+R` for a hard refresh.
5. At the top of your live site, test the **currency dropdown**, TikTok banner, bike model selector, local save and share options.

### Starting locally

Install Node.js. Inside the extracted folder open PowerShell and run:

```powershell
npm install
npm run dev
```

Then open `http://localhost:5173` or the local address displayed in the terminal. For production build use `npm run build`.

## Things to know

- Existing bike prices, part estimates and fitment labels are **illustrative** and require verification. The selected upgrades don't automatically appear on third-party bike reference photos.
- The Surron cutout bundled in `public/bikes/` comes from the screenshot the owner provided. Other stock photo URLs reference independent sites, which might block image embedding; the app displays a styled fallback instead of a broken image icon. Use your own licensed photo assets for a finished public site.
- Guest saves live in **localStorage**, not in a cloud account. They can be lost if the user clears browser storage or switches devices. **Optional online accounts are not included** in this release, since safe cloud authentication needs a real backend/database.
- The actual moon logo is bundled in `public/specx-logo.webp` and also embedded in the frontend, so it should not disappear due to a missing image URL.
- All social buttons link to <https://www.tiktok.com/@specxebikes>.
