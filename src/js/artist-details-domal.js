const body = document.body;
const modal = document.getElementById('artistModal');
const loader = document.getElementById('loader');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.block-artist-list-item__button').forEach(button => {
  button.addEventListener('click', async event => {

    loader.style.display = 'block';
    modal.style.display = 'flex';
    body.classList.add('no-scroll');

    const li = button.closest('li');

    const title = li.querySelector('.block-artist-list-item__title')?.textContent.trim();
    const description = li.querySelector('.block-artist-list-item__paragraph')?.textContent.trim();
    const image = li.querySelector('img')?.src;
    const genres = Array.from(li.querySelectorAll('.block-artist-list-item-wrapper-text__span'))
      .map(span => span.textContent.trim());

    await new Promise(resolve => setTimeout(resolve, 500));

    document.querySelector('.artist-name').textContent = title;
    document.querySelector('.artist-bio-text').textContent = description;
    document.querySelector('.artist-image').src = image;

    const genreContainer = document.querySelector('.artist-genres');
    genreContainer.innerHTML = '';
    genres.forEach(genre => {
      const btn = document.createElement('button');
      btn.className = 'ganre-btn';
      btn.textContent = genre;
      genreContainer.appendChild(btn);
    });

    loader.style.display = 'none';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  body.classList.remove('no-scroll');
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  body.classList.remove('no-scroll');

  document.querySelector('.artist-name').textContent = '';
  document.querySelector('.artist-bio-text').textContent = '';
  document.querySelector('.artist-image').src = '';

  document.querySelector('.artist-years-active').textContent = '';
  document.querySelector('.artist-sex').textContent = '';
  document.querySelector('.artist-members').textContent = '';
  document.querySelector('.artist-country').textContent = '';

  const genreContainer = document.querySelector('.artist-genres');
  genreContainer.innerHTML = '';
});