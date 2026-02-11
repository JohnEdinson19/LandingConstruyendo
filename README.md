# Carolina Agudelo – Campaign Website

Official campaign website for Carolina Agudelo.

This project is a static, performance-optimized site built with HTML, CSS, and vanilla JavaScript. It includes a dynamic carousel, modal-based PDF loading, responsive design, and image optimization strategies.

---

## 🏗 Project Architecture

```
construyendo-juntas/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── profile.png
│   ├── background.webp
│   ├── favicon.png
│   ├── carrusel/
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── ...
│   └── icons/
│       ├── facebook.svg
│       ├── instagram.svg
│       ├── twitter.svg
│       ├── tiktok.svg
│       └── whatsapp.svg
├── docs/
│   └── cv-carolina-agudelo.pdf
└── README.md
```

---

## ⚙️ Tech Stack

* HTML5
* CSS3 (custom responsive layout)
* Vanilla JavaScript (no frameworks)
* WebP image optimization

No build tools or external dependencies required.

---

## 🎠 Carousel System

The carousel is dynamically generated via JavaScript.

### Configuration

Inside `js/main.js`:

```js
const imageFolder = 'images/carrusel/';
const totalImages = 20;
```

Images must follow a numeric naming convention:

```
1.jpg
2.jpg
3.jpg
...
```

### Features

* Autoplay (4s interval)
* Infinite loop (clone-based implementation)
* Animation lock to prevent double-slide bug
* Lazy loading for performance optimization

### Performance Notes

* Recommended image size: 100–250 KB
* Recommended format: WebP
* Avoid uploading high-resolution (4000px+) images if displayed smaller

---

## 📄 PDF Loading Strategy

PDFs are loaded on demand to prevent performance degradation.

Instead of embedding the PDF directly in the HTML with a `src`, the iframe source is injected only when the modal is opened.

Benefits:

* Faster initial page load
* Reduced bandwidth usage
* Better mobile performance

Recommended PDF size:

* Ideal: < 3MB
* Maximum: 5MB

---

## 🎨 Styling

All styling is centralized in:

```
css/style.css
```

Key UI elements:

* Hero section with background image
* Responsive card layout
* Modal overlays
* Custom buttons
* Social media icon grid

Background image is configured via CSS:

```css
background-image: url('../images/background.webp');
```

Avoid using `background-attachment: fixed` on mobile if performance issues occur.

---

## 🚀 Running Locally

Option 1: Open `index.html` directly in your browser.

Option 2 (recommended): Use a local server.

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

---

## 🌍 Deployment

Compatible with any static hosting provider:

* GitHub Pages
* Netlify
* Vercel
* Traditional shared hosting

No server-side configuration required.

---

## 📈 Performance Guidelines

* Use WebP for large images
* Compress all assets before committing
* Avoid unnecessary iframes
* Keep JavaScript minimal
* Lazy-load non-critical images

---

## 🔧 Future Improvements (Optional)

* IntersectionObserver-based carousel loading
* Service worker caching
* Image srcset for responsive image delivery
* Lighthouse performance optimization pass

---

## 📌 Notes

This project intentionally avoids frameworks to maintain:

* Simplicity
* Maintainability
* Fast load times
* Low hosting complexity

---

Campaign Website – 2026