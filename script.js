/* ==========================================================================
   NEW SANIA JEWELLERS — Application Logic (Vanilla JavaScript)
   --------------------------------------------------------------------------
   TABLE OF CONTENTS
   1. STORE CONFIGURATION   ← edit contact details here (single source)
   2. PRODUCT CATALOGUE     ← edit / replace demonstration products here
   3. Utilities
   4. Contact details → DOM binding
   5. Header, mobile navigation & active-link highlighting
   6. Reveal-on-scroll animations
   7. Collections: render, filter, search
   8. Quick-view modal (accessible)
   9. Wishlist (localStorage, accessible modal)
   10. Back-to-top, toast, image fallbacks, footer year
   ========================================================================== */
"use strict";

/* ==========================================================================
   1. STORE CONFIGURATION — UPDATE THESE VALUES BEFORE LAUNCH
   ========================================================================== */
const STORE_CONFIG = {
  brandName: "New Sania Jewellers",

  /* --- WhatsApp -----------------------------------------------
     ⚠️  VERIFICATION CANDIDATE — the publicly listed number
         "0313 8666530" converted to international format.
         CONFIRM this number with the store owner before launch.
         To change it, simply replace the digits below (country
         code first, no "+", no spaces — e.g. "923001234567").   */
  whatsappNumberIntl: "923138666530",

  /* --- Phone (tap-to-call) ------------------------------------
     Same verification candidate, shown on the site.             */
  phoneDisplay: "0313 8666530",
  phoneIntl: "+923138666530",            // used for the tel: link

  /* --- Location ------------------------------------------------
     Exact GPS pin not yet verified, so directions use a Google
     Maps SEARCH for the store's full address. Once the owner has
     confirmed the exact pin, replace `mapsUrl` with the share
     link from Google Maps (Share → Copy link).                  */
  addressLine: "Mashallah Market, Aliabad, Hazara Town, Quetta, Balochistan, Pakistan",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "New Sania Jewellers, Mashallah Market, Aliabad, Hazara Town, Quetta, Balochistan, Pakistan"
    ),

  /* --- WhatsApp message templates ------------------------------ */
  msgGeneral:
    "Assalam-o-Alaikum, I am interested in a jewelry item from New Sania Jewellers. Please share the details and price.",
  msgProduct: (name) =>
    `Assalam-o-Alaikum, I am interested in the "${name}" from New Sania Jewellers. Please share the details and price.`,
};

/* ==========================================================================
   2. PRODUCT CATALOGUE — DEMONSTRATION ITEMS
   --------------------------------------------------------------------------
   Replace these sample entries with the store's real pieces.
   • id        unique string
   • name      product name
   • category  one of: rings | necklaces | earrings | bangles | wedding | occasion
   • catLabel  pretty label shown on the card
   • img       image URL (or a relative path such as "images/ring-1.jpg")
   • alt       descriptive alt text
   • desc      short description
   Prices are intentionally NOT shown — every card displays
   "Contact for Price" and invites a WhatsApp enquiry.
   All photographs below are royalty-free demonstration images (Pexels),
   not photographs of the store's actual inventory.
   ========================================================================== */
const PRODUCTS = [
  {
    id: "ring-aurelia",
    name: "Aurelia Gold Band Ring",
    category: "rings",
    catLabel: "Gold Rings",
    img: "https://images.pexels.com/photos/10053402/pexels-photo-10053402.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Pair of golden rings styled against a dark background",
    desc: "A timeless polished band — an elegant choice for engagements, gifts and everyday grace.",
  },
  {
    id: "ring-zeenat",
    name: "Zeenat Coil Ring",
    category: "rings",
    catLabel: "Gold Rings",
    img: "https://images.pexels.com/photos/15728023/pexels-photo-15728023.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Golden coil ring photographed in close-up",
    desc: "A sculptural, gracefully coiled design for those who favour something distinctive.",
  },
  {
    id: "necklace-gulbahar",
    name: "Gulbahar Pendant Necklace",
    category: "necklaces",
    catLabel: "Gold Necklaces",
    img: "https://images.pexels.com/photos/19564918/pexels-photo-19564918.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Minimalist gold necklace styled on white silk with pink flowers",
    desc: "A delicate chain and pendant that rests softly at the collarbone — effortlessly refined.",
  },
  {
    id: "necklace-meher",
    name: "Meher Statement Necklace",
    category: "necklaces",
    catLabel: "Gold Necklaces",
    img: "https://images.pexels.com/photos/24815712/pexels-photo-24815712.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Luxury gold necklace displayed on an elegant black background",
    desc: "An intricate statement piece made for evenings that deserve to be remembered.",
  },
  {
    id: "earrings-saanjh",
    name: "Saanjh Jhumka Earrings",
    category: "earrings",
    catLabel: "Earrings",
    img: "https://images.pexels.com/photos/37601639/pexels-photo-37601639.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Ornate gold jhumka earring worn on a woman's ear",
    desc: "Classic jhumkas with graceful movement — festive, traditional and forever in style.",
  },
  {
    id: "earrings-halka",
    name: "Halka Gold Hoops",
    category: "earrings",
    catLabel: "Earrings",
    img: "https://images.pexels.com/photos/15785528/pexels-photo-15785528.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Elegant minimalist gold hoop earrings",
    desc: "Light, minimal hoops that pair as easily with a casual day as with a celebration.",
  },
  {
    id: "bangles-kangan",
    name: "Kangan Bangle Pair",
    category: "bangles",
    catLabel: "Bangles & Bracelets",
    img: "https://images.pexels.com/photos/7251792/pexels-photo-7251792.png?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Pair of ornate golden bangles on rich dark fabric",
    desc: "Ornately finished bangles with a regal presence — beautiful alone or stacked.",
  },
  {
    id: "bangles-kira",
    name: "Kira Bracelet Trio",
    category: "bangles",
    catLabel: "Bangles & Bracelets",
    img: "https://images.pexels.com/photos/38827895/pexels-photo-38827895.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Three gold bracelets arranged on a reflective surface",
    desc: "A trio of slender bracelets that catch the light with every gesture.",
  },
  {
    id: "wedding-dulhan",
    name: "Dulhan Bridal Ensemble",
    category: "wedding",
    catLabel: "Wedding Jewelry",
    img: "https://images.pexels.com/photos/12708653/pexels-photo-12708653.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Bride in traditional attire adorned with intricate gold jewelry",
    desc: "A complete bridal look — necklace, earrings and accents chosen to honour the day.",
  },
  {
    id: "wedding-shahi",
    name: "Shahi Wedding Set",
    category: "wedding",
    catLabel: "Wedding Jewelry",
    img: "https://images.pexels.com/photos/14743768/pexels-photo-14743768.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Bride in a red veil wearing a gold necklace and earrings",
    desc: "Rich, ceremonial styling for the bride who wants tradition in every detail.",
  },
  {
    id: "occasion-mehfil",
    name: "Mehfil Adorned Set",
    category: "occasion",
    catLabel: "Special Occasion",
    img: "https://images.pexels.com/photos/13042449/pexels-photo-13042449.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Intricate gold earring and necklace set photographed up close",
    desc: "Finely detailed pieces for mehndis, Eid gatherings and evenings of celebration.",
  },
  {
    id: "occasion-emerald-kada",
    name: "Emerald Kada Pair",
    category: "occasion",
    catLabel: "Special Occasion",
    img: "https://images.pexels.com/photos/20493840/pexels-photo-20493840.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    alt: "Gold bangles with green gemstones on a dark background",
    desc: "Gold kadas accented with deep green stones — a striking gift for special occasions.",
  },
];

/* ==========================================================================
   3. UTILITIES
   ========================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Escape text before injecting into HTML (defence-in-depth). */
function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

/** Build a wa.me link with a pre-filled message. */
function waLink(message) {
  return `https://wa.me/${STORE_CONFIG.whatsappNumberIntl}?text=${encodeURIComponent(message)}`;
}

/* Body scroll lock (reference-counted so menu + modal don't fight) */
let lockCount = 0;
function lockBody(on) {
  lockCount = Math.max(0, lockCount + (on ? 1 : -1));
  document.body.classList.toggle("locked", lockCount > 0);
}

/* Toast */
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  $("#toastMsg").textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

/* Safe localStorage wrappers */
const storage = {
  read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
};

/* ==========================================================================
   4. CONTACT DETAILS → DOM BINDING
   ========================================================================== */
function bindContactDetails() {
  $$('[data-bind="phone"]').forEach((el) => (el.textContent = STORE_CONFIG.phoneDisplay));

  const telHref = `tel:${STORE_CONFIG.phoneIntl.replace(/\s+/g, "")}`;
  ["#phoneLink", "#footerPhone"].forEach((id) => {
    const a = $(id);
    if (a) a.href = telHref;
  });

  $$('[data-wa="general"]').forEach((a) => (a.href = waLink(STORE_CONFIG.msgGeneral)));
  $$("[data-directions], #directionsLink").forEach((a) => (a.href = STORE_CONFIG.mapsUrl));
}

/* ==========================================================================
   5. HEADER, MOBILE NAV & ACTIVE LINKS
   ========================================================================== */
function initHeader() {
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 32);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  const toggle = $("#navToggle");
  const menu = $("#mobileNav");
  let menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("open", open);
    lockBody(open);
    if (open) {
      const first = $(".nav-link", menu);
      if (first) first.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener("click", () => setMenu(!menuOpen));
  $$(".nav-link", menu).forEach((link) =>
    link.addEventListener("click", () => menuOpen && setMenu(false))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) setMenu(false);
  });

  /* Active section highlighting */
  const links = $$(".nav-desktop .nav-link");
  const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        const link = map.get(en.target.id);
        if (!link) return;
        if (en.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["home", "collections", "about", "why", "contact"].forEach((id) => {
    const sec = document.getElementById(id);
    if (sec) io.observe(sec);
  });
}

/* ==========================================================================
   6. REVEAL-ON-SCROLL
   ========================================================================== */
const revealObserver = !prefersReducedMotion
  ? new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )
  : null;

function observeReveals(scope = document) {
  $$(".reveal", scope).forEach((el) => {
    if (prefersReducedMotion) el.classList.add("in");
    else revealObserver.observe(el);
  });
}

/* ==========================================================================
   7. COLLECTIONS — RENDER, FILTER, SEARCH
   ========================================================================== */
const state = { category: "all", query: "" };

function cardHTML(p, index) {
  const wished = wishlist.has(p.id);
  return `
    <article class="product-card reveal" style="--reveal-delay:${Math.min(index * 60, 360)}ms" data-id="${esc(p.id)}">
      <div class="media card-media">
        <img src="${esc(p.img)}" alt="${esc(p.alt)}" loading="lazy" decoding="async" width="800" height="1000" />
        <span class="card-cat-label">${esc(p.catLabel)}</span>
        <button class="wish-btn" type="button" data-wish="${esc(p.id)}"
          aria-pressed="${wished}" aria-label="${wished ? "Remove" : "Save"} ${esc(p.name)} ${wished ? "from" : "to"} saved items">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
        <button class="quick-btn" type="button" data-quick="${esc(p.id)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          Quick View
        </button>
      </div>
      <div class="card-body">
        <h3 class="card-title">${esc(p.name)}</h3>
        <p class="card-desc">${esc(p.desc)}</p>
        <p class="card-price">Contact for Price</p>
        <a class="card-wa" href="${waLink(STORE_CONFIG.msgProduct(p.name))}" target="_blank" rel="noopener noreferrer"
           aria-label="Enquire about ${esc(p.name)} on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          Enquire on WhatsApp
        </a>
      </div>
    </article>`;
}

function getFiltered() {
  const q = state.query.trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    const catOK = state.category === "all" || p.category === state.category;
    const qOK = !q || p.name.toLowerCase().includes(q) || p.catLabel.toLowerCase().includes(q);
    return catOK && qOK;
  });
}

function renderProducts() {
  const grid = $("#productGrid");
  const list = getFiltered();
  grid.innerHTML = list.map(cardHTML).join("");
  $("#emptyState").classList.toggle("show", list.length === 0);
  observeReveals(grid);
}

function initCollections() {
  /* Category pills */
  $("#filtersBar").addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    $$(".filter-pill").forEach((p) => {
      p.classList.toggle("active", p === pill);
      p.setAttribute("aria-pressed", String(p === pill));
    });
    state.category = pill.dataset.filter;
    renderProducts();
  });

  /* Search (debounced) */
  const input = $("#searchInput");
  const field = $("#searchField");
  let debounce;
  input.addEventListener("input", () => {
    field.classList.toggle("has-value", input.value.length > 0);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      state.query = input.value;
      renderProducts();
    }, 140);
  });
  $("#searchClear").addEventListener("click", () => {
    input.value = "";
    field.classList.remove("has-value");
    state.query = "";
    renderProducts();
    input.focus();
  });

  /* Empty-state reset */
  $("#emptyClear").addEventListener("click", () => {
    state.category = "all";
    state.query = "";
    input.value = "";
    field.classList.remove("has-value");
    $$(".filter-pill").forEach((p) => {
      const isAll = p.dataset.filter === "all";
      p.classList.toggle("active", isAll);
      p.setAttribute("aria-pressed", String(isAll));
    });
    renderProducts();
  });

  /* Grid actions (wishlist + quick view) via delegation */
  $("#productGrid").addEventListener("click", (e) => {
    const wishBtn = e.target.closest("[data-wish]");
    if (wishBtn) return toggleWish(wishBtn.dataset.wish, wishBtn);
    const quickBtn = e.target.closest("[data-quick]");
    if (quickBtn) return openQuickView(quickBtn.dataset.quick, quickBtn);
  });

  renderProducts();
}

/* ==========================================================================
   8. ACCESSIBLE MODAL HELPERS (focus trap, Esc, overlay)
   ========================================================================== */
let activeModal = null;
let lastFocused = null;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

function openModal(modal) {
  if (activeModal) closeModal();
  lastFocused = document.activeElement;
  activeModal = modal;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("show"));
  lockBody(true);
  const first = $(FOCUSABLE, modal);
  if (first) first.focus({ preventScroll: true });
}

function closeModal() {
  if (!activeModal) return;
  const modal = activeModal;
  activeModal = null;
  modal.classList.remove("show");
  lockBody(false);
  setTimeout(() => {
    modal.hidden = true;
    if (lastFocused) lastFocused.focus({ preventScroll: true });
  }, prefersReducedMotion ? 0 : 320);
}

document.addEventListener("keydown", (e) => {
  if (!activeModal) return;
  if (e.key === "Escape") return closeModal();
  if (e.key !== "Tab") return;
  const focusables = $$(FOCUSABLE, activeModal).filter((el) => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

$$("[data-close]").forEach((el) => el.addEventListener("click", closeModal));

/* ==========================================================================
   QUICK VIEW
   ========================================================================== */
function openQuickView(id, opener) {
  const p = PRODUCTS.find((item) => item.id === id);
  if (!p) return;
  const img = $("#qvImage");
  img.src = p.img;
  img.alt = p.alt;
  $("#qvCat").textContent = p.catLabel;
  $("#qvTitle").textContent = p.name;
  $("#qvDesc").textContent = p.desc;
  $("#qvWa").href = waLink(STORE_CONFIG.msgProduct(p.name));
  openModal($("#quickModal"));
}

/* ==========================================================================
   9. WISHLIST (localStorage)
   ========================================================================== */
const WISHLIST_KEY = "nsj_wishlist_v1";
const wishlist = new Set(storage.read(WISHLIST_KEY, []));

function saveWishlist() {
  if (!storage.write(WISHLIST_KEY, [...wishlist])) {
    showToast("Saved items could not be stored in this browser.");
  }
}

function updateWishBadge() {
  const badge = $("#wishCountBadge");
  badge.hidden = wishlist.size === 0;
  badge.textContent = String(wishlist.size);
}

function toggleWish(id, btn) {
  const p = PRODUCTS.find((item) => item.id === id);
  if (!p) return;
  const adding = !wishlist.has(id);
  if (adding) wishlist.add(id);
  else wishlist.delete(id);
  saveWishlist();
  updateWishBadge();

  if (btn) {
    btn.setAttribute("aria-pressed", String(adding));
    btn.setAttribute(
      "aria-label",
      `${adding ? "Remove" : "Save"} ${p.name} ${adding ? "from" : "to"} saved items`
    );
    btn.classList.remove("pop");
    void btn.offsetWidth; /* restart animation */
    btn.classList.add("pop");
  }
  showToast(adding ? `Saved “${p.name}”` : `Removed “${p.name}”`);
}

function renderWishlist() {
  const list = $("#wishList");
  const items = [...wishlist]
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  list.innerHTML = items
    .map(
      (p) => `
      <div class="wish-item">
        <div class="media"><img src="${esc(p.img)}" alt="${esc(p.alt)}" loading="lazy" decoding="async" width="124" height="148" /></div>
        <div class="wish-item-info">
          <span>${esc(p.catLabel)}</span>
          <h4>${esc(p.name)}</h4>
        </div>
        <div class="wish-item-actions">
          <a class="wish-mini" href="${waLink(STORE_CONFIG.msgProduct(p.name))}" target="_blank" rel="noopener noreferrer" aria-label="Enquire about ${esc(p.name)} on WhatsApp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </a>
          <button class="wish-mini wish-mini--remove" type="button" data-remove="${esc(p.id)}" aria-label="Remove ${esc(p.name)} from saved items">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>`
    )
    .join("");

  $("#wishEmpty").hidden = items.length > 0;
}

function initWishlist() {
  updateWishBadge();
  $("#wishOpenBtn").addEventListener("click", () => {
    renderWishlist();
    openModal($("#wishModal"));
  });
  $("#wishList").addEventListener("click", (e) => {
    const rm = e.target.closest("[data-remove]");
    if (!rm) return;
    const id = rm.dataset.remove;
    /* keep card hearts in sync */
    toggleWish(id, $(`[data-wish="${CSS.escape(id)}"]`));
    renderWishlist();
  });
}

/* ==========================================================================
   10. BACK-TO-TOP, IMAGE FALLBACKS, FOOTER YEAR
   ========================================================================== */
function initChrome() {
  const toTop = $("#toTop");
  window.addEventListener(
    "scroll",
    () => toTop.classList.toggle("show", window.scrollY > 640),
    { passive: true }
  );
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  );

  /* Graceful image fallback (capture phase catches resource errors) */
  document.addEventListener(
    "error",
    (e) => {
      const t = e.target;
      if (t && t.tagName === "IMG") {
        const wrap = t.closest(".media");
        if (wrap) wrap.classList.add("media-fallback");
      }
    },
    true
  );

  $("#yearSpan").textContent = String(new Date().getFullYear());
}

/* ==========================================================================
   BOOT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  bindContactDetails();
  initHeader();
  initCollections();
  initWishlist();
  initChrome();
  observeReveals();
});
