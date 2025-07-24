// (async () => {
//   const partials = document.querySelectorAll("load[src]");

//   for (const el of partials) {
//     const url = el.getAttribute("src");
//     const res = await fetch(url);
//     const html = await res.text();
//     const container = document.createElement("div");
//     container.innerHTML = html;
//     el.replaceWith(...container.childNodes);
//   }

//   const scripts = [
//     "./js/header.js",
//     "./js/hero-section.js",
//     "./js/artists-section.js",
//     "./js/artist-details-domal.js",
//     "./js/about-us-section.js",
//     "./js/feedback-section.js",
//     "./js/footer.js",
//   ];

//   for (const src of scripts) {
//     await new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.type = "module";
//       script.onload = resolve;
//       script.onerror = reject;
//       document.body.appendChild(script);
//     });
//   }
// })();