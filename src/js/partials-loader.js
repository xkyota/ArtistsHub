(async () => {
  const templates = document.querySelectorAll("template[load]");

  // Завантажуємо шаблони послідовно
  for (const el of templates) {
    const url = el.getAttribute("load");
    const res = await fetch(url);
    const html = await res.text();
    el.innerHTML = html;
    const clone = el.content.cloneNode(true);
    document.body.appendChild(clone);
  }

  const scripts = [
    "js/about-us-section.js",
    "js/artist-details-domal.js",
    "js/artists-section.js",
    "js/feedback-section.js",
    "js/footer.js",
    "js/header.js",
    "js/hero-section.js",
  ];

  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.type = "module";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
})();