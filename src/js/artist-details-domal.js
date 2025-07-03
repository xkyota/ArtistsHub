const artistModal = document.getElementById('artistModal');
const closeBtn = artistModal.querySelector('.close-btn');

// 1. Загрузка данных артиста по ID
async function fetchArtistData(artistId) {
  try {
    const res = await fetch(`https://sound-wave.b.goit.study/api/artists/${artistId}`);
    const artist = await res.json();

    // Заполнение данных
    artistModal.querySelector('.artist-name').textContent = artist.name || 'Unknown';
    artistModal.querySelector('.artist-image').src = artist.image || '';
    artistModal.querySelector('.artist-years-active').textContent = formatYears(artist.years);
    artistModal.querySelector('.artist-sex').textContent = artist.sex || '—';
    artistModal.querySelector('.artist-members').textContent = artist.members || '—';
    artistModal.querySelector('.artist-country').textContent = artist.country || '—';
    artistModal.querySelector('.artist-bio-text').textContent = artist.bio || 'Biography missing.';

    // Жанры
    const genresContainer = artistModal.querySelector('.artist-genres');
    genresContainer.innerHTML = '';
    (artist.genres || []).forEach(genre => {
      const btn = document.createElement('button');
      btn.className = 'ganre-btn';
      btn.textContent = genre;
      genresContainer.appendChild(btn);
    });

    // Показать модалку
    artistModal.style.display = 'flex';

    // Загрузка альбомов
    fetchAlbums(artistId);

  } catch (e) {
    console.error('Ошибка при загрузке артиста:', e);
  }
}

// 2. Форматирование годов
function formatYears(years) {
  if (!years?.start) return 'information missing';
  return years.end ? `${years.start}–${years.end}` : `${years.start}–present`;
}

// 3. Загрузка альбомов
async function fetchAlbums(artistId) {
  const albumsContainer = document.querySelector('.artist-albums');
  albumsContainer.innerHTML = '';

  try {
    const res = await fetch(`https://sound-wave.b.goit.study/api/artists/${artistId}/albums`);

    if (!res.ok) {
      if (res.status === 404) {
        albumsContainer.textContent = 'Альбомы не найдены.';
        return;
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    }

    const albums = await res.json();

    if (!albums.length) {
      albumsContainer.textContent = 'Нет альбомов для отображения.';
      return;
    }

    albums.forEach(album => {
      const albumBlock = document.createElement('div');
      albumBlock.classList.add('album');

      const title = document.createElement('h4');
      title.textContent = album.title;
      title.style.margin = '16px 0 8px';
      albumBlock.appendChild(title);

      const trackList = document.createElement('ul');
      trackList.style.marginLeft = '16px';

      album.tracks.forEach(track => {
        const li = document.createElement('li');
        li.textContent = `${track.trackNumber}. ${track.title} (${track.duration})`;
        trackList.appendChild(li);
      });

      albumBlock.appendChild(trackList);
      albumsContainer.appendChild(albumBlock);
    });

  } catch (e) {
    console.error('Ошибка загрузки альбомов:', e);
    albumsContainer.textContent = 'Ошибка загрузки альбомов.';
  }
}

// 4. Обработчик кнопок открытия модалки
document.querySelectorAll('.open-modal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const artistId = btn.dataset.id;
    fetchArtistData(artistId);
  });
});

// 5. Закрытие модалки по кнопке "×"
closeBtn.addEventListener('click', () => {
  artistModal.style.display = 'none';
  clearModal();
});

// 6. Закрытие по клику вне окна
artistModal.addEventListener('click', e => {
  if (e.target === artistModal) {
    artistModal.style.display = 'none';
    clearModal();
  }
});

// 7. Очистка данных при закрытии
function clearModal() {
  artistModal.querySelector('.artist-name').textContent = '';
  artistModal.querySelector('.artist-image').src = '';
  artistModal.querySelector('.artist-years-active').textContent = '';
  artistModal.querySelector('.artist-sex').textContent = '';
  artistModal.querySelector('.artist-members').textContent = '';
  artistModal.querySelector('.artist-country').textContent = '';
  artistModal.querySelector('.artist-bio-text').textContent = '';
  artistModal.querySelector('.artist-genres').innerHTML = '';
  artistModal.querySelector('.artist-albums').innerHTML = '';
}
