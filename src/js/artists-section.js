export const artistIDs = [];
let currentPage = 1;
const LIMIT = 8;

const refs = {
  cardsContainer: document.querySelector('.block-artist__list'),
  loadMoreBtn: document.querySelector('.block-artist-wrapper__button'),
};

refs.loadMoreBtn.classList.remove('hidden');

async function fetchArtists(page = 1, limit = LIMIT) {
  const response = await fetch(`https://sound-wave.b.goit.study/api/artists?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Error: ' + response.status);
  return response.json();
}

function renderArtists(artists, container) {
  artists.forEach(artist => {
    artistIDs.push(artist._id);

    const genresMarkup = artist.genres
      .map(genre => `<span class="block-artist-list-item-wrapper-text__span">${genre}</span>`)
      .join('');

    const bioShort = artist.strBiographyEN.length > 200
      ? artist.strBiographyEN.slice(0, 200) + '...'
      : artist.strBiographyEN;

    container.insertAdjacentHTML(
      'beforeend',
      `
      <li class="block-artist-list__item">
        <div class="block-artist-list-item__wrapper-icon">
          <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" class="block-artist-list-wrapper__icon" width="672" height="432">
        </div>
        <div class="block-artist-list-item__wrapper-text">
          ${genresMarkup}
        </div>
        <h2 class="block-artist-list-item__title">${artist.strArtist}</h2>
        <p class="block-artist-list-item__paragraph">${bioShort}</p>
        <button class="block-artist-list-item__button" data-id="${artist._id}">
          Learn More <img src="/img/artist-section/arrow-right.svg" alt="arrow-right">
        </button>
      </li>
      `
    );
  });
}

async function onLoadMoreBtnClick(event) {
  event.target.blur();
  currentPage++;
  
  try {
    const { artists, totalArtists } = await fetchArtists(currentPage, LIMIT);
    renderArtists(artists, refs.cardsContainer);

    const firstNewCard = refs.cardsContainer.lastElementChild;
    await new Promise(resolve => setTimeout(resolve, 100));
    const cardHeight = firstNewCard.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 1, behavior: 'smooth' });

    const totalPages = Math.ceil(totalArtists / LIMIT);
    if (currentPage >= totalPages) {
      iziToast.info({
        title: '',
        message: 'Ви, передивились всіх артистів.',
        position: 'topRight',
        timeout: 4000,
        titleColor: '#fff',
        backgroundColor: '#764191',
        messageColor: '#fff',
      });
      refs.loadMoreBtn.classList.add('hidden');
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    }
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  try {
    const { artists, totalArtists } = await fetchArtists(currentPage, LIMIT);
    renderArtists(artists, refs.cardsContainer);

    const totalPages = Math.ceil(totalArtists / LIMIT);
    if (currentPage >= totalPages) {
      refs.loadMoreBtn.classList.add('hidden');
    } else {
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }
  } catch (err) {
    console.error(err);
  }
})();
