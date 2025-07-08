document.querySelectorAll('.block-artist-list-item__button').forEach(button => {
  button.addEventListener('click', event => {
    const li = button.closest('li');

    const title = li.querySelector('.block-artist-list-item__title')?.textContent.trim();
    const description = li.querySelector('.block-artist-list-item__paragraph')?.textContent.trim();
    const image = li.querySelector('img')?.src;
    const genres = Array.from(li.querySelectorAll('.block-artist-list-item-wrapper-text__span')).map(span => span.textContent.trim());


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

   
    document.getElementById('artistModal').style.display = 'flex';
  });
});


document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('artistModal').style.display = 'none';
});
