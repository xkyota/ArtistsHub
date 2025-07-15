const modal = document.getElementById('artistModal');
const closeBtn = modal?.querySelector('.close-btn');

document.addEventListener('click', async event => {
  const btn = event.target.closest('.block-artist-list-item__button');
  if (!btn) return;

  const id = btn.dataset.id;
  if (!id) {
    console.warn('У кнопки нет data-id');
    return;
  }

  try {
    const res = await fetch(`https://sound-wave.b.goit.study/api/artists/${id}`);
    const data = await res.json();
    const artist = data.artists?.[0] || data;

    if (!artist || !artist.strArtist) {
      console.warn('Нет данных по артисту:', data);
      return;
    }
    document.querySelector('.artist-name').textContent = artist.strArtist || '';
    document.querySelector('.artist-bio-text').textContent = artist.strBiographyEN || '';
    document.querySelector('.artist-image').src = artist.strArtistThumb || '';
    document.querySelector('.artist-years-active').textContent = artist.intFormedYear || '—';
    document.querySelector('.artist-sex').textContent = artist.strGender || '—';
    document.querySelector('.artist-members').textContent = artist.intMembers || '—';
    document.querySelector('.artist-country').textContent = artist.strCountry || '—';

    const genresContainer = document.querySelector('.artist-genres');
    genresContainer.innerHTML = '';
    artist.genres?.forEach(genre => {
      const genreBtn = document.createElement('button');
      genreBtn.className = 'ganre-btn';
      genreBtn.textContent = genre;
      genresContainer.appendChild(genreBtn);
    });

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

  } catch (error) {
    console.error('Ошибка при загрузке данных об артисте:', error);
  }
});

closeBtn?.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
});
