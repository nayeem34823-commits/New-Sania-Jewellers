# New Sania Jewellers — Website

A premium, static, single-page website for **New Sania Jewellers**, a jewelry store in
Mashallah Market, Aliabad, Hazara Town, Quetta, Balochistan, Pakistan.

Built with **HTML5, CSS3 and vanilla JavaScript only** — no frameworks, no build tools,
no databases, no paid dependencies. Deploy it free on GitHub Pages, Cloudflare Pages or Netlify.

---

## 1. Files

| File | Purpose |
|---|---|
| `index.html` | Page structure, SEO meta tags, Schema.org business data |
| `style.css` | The complete design system (colors, fonts, layout — edit the `:root` variables to rebrand) |
| `script.js` | **All settings and products**, plus every interactive feature |
| `README.md` | This guide |

Keep all four files in the **same folder**.

---

## 2. Test the website locally

**Option A — quickest:** double-click `index.html`. It opens in your browser and works immediately.

**Option B — local server (recommended, closest to production):**

```bash
# Python 3 (pre-installed on most systems)
python -m http.server 8000
# then open http://localhost:8000

# or with Node.js installed
npx serve .
```

**What to check:** menu links scroll to sections · category filters and search work ·
heart icon saves items (persists after reload) · quick-view modal opens/closes with mouse,
`Tab` and `Esc` · WhatsApp buttons open `wa.me` with a pre-filled message.

---

## 3. Update the WhatsApp number and store details (IMPORTANT)

Everything lives in **one place** — the top of `script.js`:

```js
const STORE_CONFIG = {
  whatsappNumberIntl: "923138666530",   // ⚠️ verification candidate: 0313 8666530
  phoneDisplay: "0313 8666530",
  phoneIntl: "+923138666530",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=...",
  ...
};
```

1. **Verify the number with the store owner first.** The included number is a public
   *verification candidate*, not confirmed data.
2. To change WhatsApp: replace `whatsappNumberIntl` — country code first, no `+`, no spaces
   (e.g. `923001234567`). Every WhatsApp button on the site updates automatically.
3. **Exact map pin:** find the store on Google Maps → **Share → Copy link** → paste that
   link into `mapsUrl`. Until then the site uses a safe address-search link.

---

## 4. Replace demonstration products & images

Products are a simple array in `script.js` (section *2. PRODUCT CATALOGUE*). Each entry:

```js
{
  id: "ring-aurelia",               // any unique text
  name: "Aurelia Gold Band Ring",
  category: "rings",                // rings | necklaces | earrings | bangles | wedding | occasion
  catLabel: "Gold Rings",           // label shown on the card
  img: "https://…/photo.jpg",       // or a local file: "images/ring-1.jpg"
  alt: "Describe the photo…",
  desc: "One elegant sentence.",
}
```

**Using your own photos (recommended):**
1. Create an `images` folder next to `index.html`.
2. Add your photos (ideally around **800 × 1000 px**, JPG/WebP).
3. Set `img: "images/my-photo.jpg"`.

Current photos are **royalty-free Pexels stock images used only as demonstrations** —
they are not photos of the store's real inventory. Prices intentionally show
*"Contact for Price"*; add real pricing only when the owner confirms it.

---

## 5. Deploy free on GitHub Pages

1. Create a GitHub account → **New repository** → name it e.g. `new-sania-jewellers` → Public → Create.
2. Click **Add file → Upload files** and drag in `index.html`, `style.css`, `script.js`, `README.md` → **Commit changes**.
3. Go to **Settings → Pages**.
4. Under *Build and deployment*: Source = **Deploy from a branch**, Branch = **main**, folder = **/(root)** → Save.
5. Wait 1–2 minutes. Your site is live at:
   `https://<your-username>.github.io/new-sania-jewellers/`

---

## 6. Connect a custom domain later (optional)

1. Buy a domain from any registrar (Namecheap, GoDaddy, Cloudflare…).
2. In the repo: **Settings → Pages → Custom domain** → enter `www.yourdomain.com` → Save.
   GitHub creates a `CNAME` file automatically.
3. At your registrar's DNS settings add:
   - `CNAME` record: host `www` → `<your-username>.github.io`
   - (For the root domain) `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Back in **Settings → Pages**, tick **Enforce HTTPS** once the certificate is issued (up to 24 h).
5. Update the `canonical` and `og:url` placeholders in `index.html` with the real domain.

---

## 7. Notes & honest limitations

- **Payments, orders and live inventory are not included.** Real online payments, order
  management and stock synchronisation require additional services (a payment gateway and
  backend or an e-commerce platform). This site is a storefront and enquiry channel and can
  be extended later.
- Opening hours, email, social links and GPS coordinates were **not invented** — add them in
  `script.js` / `index.html` only once the owner supplies them.
- The Schema.org block in `index.html` contains only verified information (name + address).
- The current year in the footer is generated automatically.

## Credits

- Photography: [Pexels](https://www.pexels.com) (royalty-free demonstration imagery)
- Fonts: Cormorant Garamond & Jost (Google Fonts)
- Icons: inline SVG (Lucide-style line icons + WhatsApp glyph)
