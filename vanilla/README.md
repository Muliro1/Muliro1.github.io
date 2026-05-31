# Vanilla Portfolio Site

A plain HTML, CSS, and JavaScript version of this portfolio — no Bootstrap, PHP, or vendor JS libraries.

## What's different from the main site

| Removed | Replaced with |
|---------|---------------|
| Bootstrap CSS/JS | `assets/css/layout.css` (minimal grid/flex utilities) |
| AOS | CSS fade-in + Intersection Observer |
| Typed.js | Vanilla typing animation |
| Swiper | Custom carousel in `main.js` |
| Isotope | Simple CSS show/hide filter |
| GLightbox | Vanilla lightbox overlay |
| PHP contact form | Client-side form → `mailto:` link |

## Preview locally

```bash
cd vanilla
python3 -m http.server 8080
```

Then open http://localhost:8080

## Deploy

This folder is self-contained. You can deploy it as a GitHub Pages subdirectory (`/vanilla/`) or copy its contents to replace the root site when you're ready.
