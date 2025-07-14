const artistList = document.querySelector('.block-artist__list');

fetch('https://sound-wave.b.goit.study/api/artists')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    const artists = data.artists || data;

    artists.forEach(artist => {
      const genresMarkup = artist.genres
        .map(
          genre =>
            `<span class="block-artist-list-item-wrapper-text__span">${genre}</span>`
        )
        .join('');

      const bioShort =
        artist.strBiographyEN.length > 200
          ? artist.strBiographyEN.slice(0, 200) + '...'
          : artist.strBiographyEN;

      artistList.insertAdjacentHTML(
        'beforeend',
        `
        <li class="block-artist-list__item">
          <div class="block-artist-list-item__wrapper-icon">
            <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" class="block-artist-list-wrapper__icon" width="574"
              height="394">
          </div>
          <div class="block-artist-list-item__wrapper-text">
            ${genresMarkup}
          </div>
          <h2 class="block-artist-list-item__title">${artist.strArtist}</h2>
          <p class="block-artist-list-item__paragraph">${bioShort}</p>
          <button class="block-artist-list-item__button">Learn More <img
              src="/img/artist-section/arrow-right.svg" alt="arrow-right"></button>
        </li>
      `
      );
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
