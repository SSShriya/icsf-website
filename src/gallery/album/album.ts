import {prettifyName, URL_PATH} from '../utils.js';

// get the album name from the url parameters
const params = new URLSearchParams(window.location.search);
const albumName = params.get('name');
const ALBUM_PATH = `${URL_PATH}/${albumName}`

const container = document.getElementById('album-container')!;
const loadingMsg = document.getElementById('loading-msg')!;

async function loadAlbum(): Promise<void> {
  if (!albumName) {
    loadingMsg.textContent = 'No album specified';
    return;
  }

  // set page title and site header
  const title = prettifyName(albumName);
  document.title = `${title} - ICSF`;
  const header = document.querySelector('site-header');
  header?.setAttribute('subtitle', title);

  try {
    const response = await fetch(`${ALBUM_PATH}/photos.json`);
    if (!response.ok) throw new Error(`HTTP: ${response.status}`);

    const photos: string[] = await response.json();
    loadingMsg.remove();

    // make photo thumbnail for each photo
    for (const photo of photos) {
      const photoPath = `${ALBUM_PATH}/${photo}`;

      const link = document.createElement('a');
      link.href = photoPath;
      link.className = 'thumb';

      const img = document.createElement('img');
      const imgLabel = prettifyName(photo);
      img.src = photoPath;
      img.alt = imgLabel;
      img.loading = 'lazy';

      const label = document.createElement('span');
      label.textContent = imgLabel;

      link.appendChild(img);
      link.appendChild(label);

      container.appendChild(link);
    }
  } catch (err) {
    loadingMsg.textContent = 'Failed to load album';
    console.error(err);
  }
}

loadAlbum();