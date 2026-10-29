# SPECX 2.1 — Build Beyond Limits

A monochrome / space-inspired e-bike configurator for Surron, Talaria, Stark Varg, E Ride Pro, 79 Bike, ETM RTR and Ridstar. React + Vite, 2D reference photos, 15 upgrade categories, editable AUD estimates, optional server-side AI concept preview, and TikTok **@specxebikes**.

## NEW in 2.1

1. **Edit Prices** — In the site navigation choose **EDIT PRICES**. Edit bike prices and all upgrade prices in AUD. The live build total, selected upgrades and downloadable build sheet use your new prices. Your edits persist in **your browser only** until you publish them.
2. **Publish prices for every visitor** — In the price editor click **EXPORT / PUBLISH PRICES**, which downloads `prices.json`. Replace the file `public/prices.json` in your GitHub repository with the downloaded file, commit, and wait for Vercel to redeploy. This updates the default price list **for everyone**. A visitor who previously customised their own browser price overrides will still see their local prices. Press **RESET ALL** in their price editor to use the published list.
3. **TikTok** — Buttons in the navigation and footer link to <https://www.tiktok.com/@specxebikes>.
4. **AI Studio** — After choosing a bike and upgrades, scroll below its preview and click **GENERATE AI PREVIEW**. The preview uses an actual server-side image-generation API, not a fake colour filter. You may upload **your own photo of your bike** and optionally **a photo of the aftermarket part** to give the model stronger visual references. Switch between **ORIGINAL / AI** and save the AI concept as a JPG.
5. **AI generations are on-demand**, not automatically triggered after every change, because **each generation incurs an API charge**. If you change the build after generation, the photo is marked outdated until regenerated.

**Important:** AI images are imaginative approximations, **not** exact manufacturer CAD or guaranteed accurate aftermarket part photos. Prickly pegs, seat covers, etc. may be drawn inaccurately. Verify appearance, compatibility, dimensions and safety with a supplier. SpecX is not affiliated with the third-party manufacturers.

## Get the new version live on your existing GitHub + Vercel site (Windows)

### A. Upload the files

1. Unzip `specx-2.1.zip` on your Windows PC.
2. Open your **existing** GitHub SpecX repository. Do **not** create a new repo.
3. Easiest way to preserve folders: use GitHub Desktop to clone the repository to your PC, copy the **contents** of `specx-2.1` into the cloned folder, replacing existing files, then **Commit** and **Push origin**. Alternatively use GitHub's web upload and make sure the paths below are preserved.
4. Make sure the repository has this structure **at its root** (the whole project must not be nested inside another `specx-2.1` folder):

```text
specx/
├── index.html
├── main.jsx
├── style.css
├── package.json
├── README.md
├── .gitignore
├── .env.example       # example only — NO actual secrets
├── public/
│   └── prices.json    # globally published estimated prices
└── api/
    └── generate-preview.js  # Vercel serverless AI route
```

5. Vercel automatically redeploys after the push. Settings should still be: framework **Vite**, build command `npm run build`, output directory `dist`, root directory `./`.
6. **Prices / TikTok / bike selection work immediately.** AI remains locked until Step B.

### B. Turn on AI photo generation (optional, paid service)

1. Set up an OpenAI **API account with image-model access and billing**. ChatGPT Plus is separate from API billing. AI requests **cost money**. Set an appropriate budget / spend limit and keep the owner-only passcode private.
2. Open Vercel → **SpecX project** → **Settings** → **Environment Variables**.
3. Add these variables for the Production environment:

   - `OPENAI_API_KEY` = your secret OpenAI API key (**server-side only**)
   - `SPECX_PREVIEW_PASSCODE` = a **long private passcode** you choose (ideally at least 16 random characters)
   - Optional: `SPECX_IMAGE_MODEL` = `gpt-image-2.5-flare` (this is already the default)

4. Save. Go to **Deployments** and **Redeploy** to apply the new settings.
5. In SpecX, choose a model, choose upgrades (for example, Prickly Motorsports pegs), enter your owner passcode in the **AI Studio** field, and press **GENERATE AI PREVIEW**. The site sends the selected bike / upgrades and optional uploaded reference photos to `/api/generate-preview` securely on the same origin. Your secret API key stays on Vercel, **not inside the website's front-end files**.
6. Optional: upload a photo of your bike with **MY PHOTO** under the preview, then a part photo with **ADD PART REFERENCE PHOTO** in AI Studio. The image model edits your bike photo using the part as a reference. Only upload photos you own or have permission to use.

**Never paste your actual API key or private passcode into GitHub, JavaScript, or chat messages.** `.env.example` contains fake values, not your secrets.

**Hosting note:** Vercel Hobby functions have duration and response-size constraints; on slow image generations you may receive a timeout and need to try later or configure a production-grade processing flow. This prototype has a private owner passcode plus a *best-effort* in-memory limit to protect API usage. For a public AI service serving other people, use real authentication, durable rate limiting, abuse prevention, and provider billing controls before opening it up. AI is not enabled for everyone automatically.

## Run locally on Windows

1. Install Node.js LTS from <https://nodejs.org/>.
2. Open `specx-2.1` in File Explorer, click the address bar, type `cmd`, press Enter.
3. Run `npm install` then `npm run dev`.
4. Open <http://localhost:5173>.

The configurator, custom pricing and TikTok link work under Vite. **AI requires the serverless route**, so for local AI testing use Vercel CLI and `vercel dev` with your own environment variables, or test AI on your deployed Vercel site.

## Pricing notes

- Prices are **illustrative AUD estimates**, not live merchant prices.
- `public/prices.json` is the published source of default prices. When you export from the editor, upload the downloaded `prices.json` over this file (keep the `public/` folder).
- Edits in your browser override `public/prices.json` locally. **RESET ALL** removes your local overrides.
- Share links contain the selected parts and colour, **not your local price edits or images**.
- Install labour, taxes, shipping and supplier compatibility must be confirmed independently.

## Photo and safety notes

- The seven **stock reference photographs** in `main.jsx` are linked from external sites, not bundled with permission. They may stop loading or block hotlinks. Replace them with your own appropriately licensed photographs before a public/commercial release.
- The preview is 2D, not a rotatable 3D model. Upgrades are **not applied** to the stock photo; the AI button makes a **new approximate concept image**.
- Uploaded photos are local until you click **Generate AI Preview**, when they are sent to the image API to process the request. Photos are not saved in your browser's persistent storage or a SpecX database. Generated images stay in current browser memory until refresh, unless you download them.
- Part names and compatibility are examples. Check proper parts and installation with a qualified supplier and follow local riding laws.

## Current test status

Syntax checks were run against `main.jsx` and the serverless API; API handler configuration/authentication and mocked request response paths were exercised. A full npm/Vite production build and a real image-provider request **have not been run in this environment**, so please test deployment and your configured API in Vercel.
