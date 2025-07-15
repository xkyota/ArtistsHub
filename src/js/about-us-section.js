const block = document.querySelector('.block2__about');
const image = document.querySelector('.img__about');

const observerSettings = {
    threshold: 0.2,
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el === image) {
            el.src = el.dataset.src;
            el.classList.add('added');
        }
        if (el === block) {
            el.classList.add('animated');
        }
        observer.unobserve(el);
    });
}, observerSettings);

if (block) observer.observe(block);
if (image) observer.observe(image);