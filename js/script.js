import { CONFIG } from './config.js';

const fallbackConfig = {
  herName: 'Her Name',
  myName: 'My Name',
  secretHint: 'Secret hint placeholder.',
  letter: { title: 'Letter Title Placeholder', text: ['Letter text placeholder.'] },
  photos: [],
  song: { title: 'Song title', artist: 'Artist' }
};

const safeConfig = {
  ...fallbackConfig,
  ...CONFIG,
  letter: {
    ...fallbackConfig.letter,
    ...(CONFIG?.letter ?? {})
  },
  song: {
    ...fallbackConfig.song,
    ...(CONFIG?.song ?? {})
  },
  photos: Array.isArray(CONFIG?.photos) ? CONFIG.photos : fallbackConfig.photos
};

const setTextForAll = (selector, value) => {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value;
  });
};

const renderLetter = () => {
  const titleNode = document.querySelector('[data-letter-title]');
  const bodyNode = document.querySelector('[data-letter-body]');

  if (titleNode) {
    titleNode.textContent = safeConfig.letter.title;
  }

  if (!bodyNode) return;

  bodyNode.innerHTML = '';
  safeConfig.letter.text.forEach((line) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = line;
    bodyNode.append(paragraph);
  });
};

const renderPhotos = () => {
  const listNode = document.querySelector('[data-photo-list]');
  if (!listNode) return;

  listNode.innerHTML = '';
  safeConfig.photos.forEach((photo, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'photo-card';

    const figure = document.createElement('figure');
    figure.className = 'photo-figure';

    const image = document.createElement('img');
    image.loading = 'lazy';
    image.decoding = 'async';
    image.src = photo.src;
    image.alt = photo.alt || `Temporary photo placeholder ${index + 1}`;

    const caption = document.createElement('figcaption');
    caption.textContent = photo.caption || `Photo ${index + 1}`;

    figure.append(image, caption);
    listItem.append(figure);
    listNode.append(listItem);
  });
};

const renderSong = () => {
  const titleNode = document.querySelector('[data-song-title]');
  const artistNode = document.querySelector('[data-song-artist]');

  if (titleNode) titleNode.textContent = safeConfig.song.title;
  if (artistNode) artistNode.textContent = safeConfig.song.artist;
};

const initFoundation = () => {
  setTextForAll('[data-her-name]', safeConfig.herName);
  setTextForAll('[data-my-name]', safeConfig.myName);
  setTextForAll('[data-secret-hint]', safeConfig.secretHint);

  renderLetter();
  renderPhotos();
  renderSong();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFoundation, { once: true });
} else {
  initFoundation();
}
