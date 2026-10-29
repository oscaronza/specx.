# SPECX 2.0 — Build Beyond Limits

A black-and-white, space-inspired **2D e-bike configurator** powered by React + Vite. It replaces the earlier placeholder 3D bike with realistic *reference photographs* of specific bike models.

## What's included

- Seven bike choices: Surron Light Bee X, Talaria Sting R MX4, Stark Varg EX, E Ride Pro SS 2.0, 79 Bike Falcon M, ETM RTR Sport and Ridstar Q20.
- Fifteen upgrade categories including pegs, Guts Racing seat cover options, foot brake concepts, powder coating, graphics, handlebars, wheels and more.
- Live **AUD** demo estimates and an itemised downloadable build sheet.
- A responsive, monochrome / chrome / space-like UI with animated stars, a finish inspiration palette, searchable bike selector and zoom controls.
- Upload your own side-profile bike photograph **locally in your browser** (the photo is not uploaded to a server).
- Auto-save build selections in browser storage, and copy a link containing the selections (not your uploaded image).

## Run on Windows PC

1. Install Node.js LTS from <https://nodejs.org/>.
2. Extract the ZIP and open the folder `specx-2.0` in File Explorer.
3. Click the address bar, type `cmd`, press Enter.
4. Enter `npm install` and then `npm run dev`.
5. Open the URL displayed in the terminal (usually <http://localhost:5173/>).

## Update your existing GitHub + Vercel site

**Important: these five files must be directly in your repository's ROOT**, not inside another folder:

```text
specx/
├── index.html
├── main.jsx
├── style.css
├── package.json
└── README.md
```

1. Visit your existing GitHub `specx` repository, not a new one.
2. Replace the existing `index.html`, `main.jsx`, `style.css`, `package.json` and `README.md` with the ones from this ZIP. GitHub's **Add file → Upload files** will let you replace files if you upload the extracted files (not the ZIP) and commit changes. If GitHub doesn't permit overwriting, edit or delete the old files and upload the new ones.
3. **Delete old `src/main.jsx` and `src/style.css` files only if they still exist.** This package does not use a `src/` folder. The root `index.html` correctly points to `/main.jsx`.
4. Commit your changes to `main`.
5. Vercel should automatically deploy. Its framework preset should be **Vite**, build command `npm run build`, output directory `dist`, root directory `./`.

To test a production build on your PC, run `npm run build`.

## Editing content

- Bike models, prices, photo URLs and source links: top of `main.jsx`, in `bikes`.
- Upgrade categories and sample prices: `categories` in `main.jsx`.
- Finish palette: `colors` in `main.jsx`.
- All styling and animations: `style.css`.

## IMPORTANT — photo copyright, estimates, fitment

**External stock bike photos load from third-party websites.** They are referenced for a visual prototype and may stop loading or block hotlinking. SpecX does **not** have rights to those photographs. Before commercial/public production use, obtain permission or replace with your own licensed side-profile photographs, host those images on your own website, and replace the URLs in `main.jsx`. Site functionality does not depend on those photos loading; it offers a fallback plus an option for a local user photo.

Photo reference sources:

- Surron: Ronhack — <https://ronhack.com/blogs/surron/exploring-the-power-of-the-sur-ron-light-bee-x-top-speed-weight-and-key-upgrades>
- Talaria: HighVoltagePEV — <https://highvoltagepev.com/products/talaria-sting-r-mx4>
- Stark Varg: Ridewill — <https://www.ridewill.com/p/de/stark-future-vargex-60-gp-elektro-motorrad-stark-varg-ex-21-18-60-ps-mit-pedalbremse-grau-zugelassen/1691084/>
- E Ride Pro: E Ride Pro Dealer Portal — <https://dealer.eridepro.com/products/pro-ss-2-0>
- 79 Bike: 79bikes Canada — <https://79bikes-ca.com/products/79bike-falcon-m-electric-dirt-bike>
- ETM RTR: Jersey E-Bikes — <https://jerseyebikes.com/products/etm-rtr-sport>
- Ridstar: Geekbuying — <https://www.geekbuying.com/item/Ridstar-Q20-Electric-Bike-20-inch-1000W-Motor-48V-20Ah-48km-h-Speed-522946.html>

**Prices are demo placeholders in AUD, not live or verified retailer prices.** Parts are conceptual choices; no manufacturer fitment has been verified. The photo stays a *stock photograph* rather than pretending to visually show each aftermarket part. The finish picker is inspiration only, with a separate powder coat price option. Confirm suitability, safety, correct installation and local regulations with qualified professionals. SpecX is unaffiliated with brands named in the sample data. This prototype does not have checkout or payment functionality.
