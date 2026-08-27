import * as fs from 'fs';
import * as path from 'path';

import {prettifyName} from './utils.js';

// this BASE_URL will then get replaced in the generated html by the actual base url by Vite in the
// second build step
const URL_PATH = `%BASE_URL%gallery`;

const GALLERY_DIR = './public/gallery';
const TEMPLATE_FILE = './src/gallery/gallery-template.html';
const OUTPUT_FILE = './src/gallery/index.html';

/* Given an album directory name, and a list of images in the album,
   make a JSON file with all the image paths */
function buildAlbumJSON(album: string, images: string[]): void {
  const outputPath = path.join(GALLERY_DIR, album, 'photos.json');
  fs.writeFileSync(
      outputPath, JSON.stringify(images, /* replacer */ null, /* spaces */ 2), 'utf-8');
}

/* Given: link the thumbnail goes to, link for thumb image, thumbnail label,
   build the HTML for a single thumbnail */
function buildThumbHTML(href: string, imgSrc: string, label: string): string {
  return `
        <a href="${href}" class="thumb">
            <img src="${imgSrc}" alt="${label}"/>
            <span>${label}</span>
        </a>`;
}

/* Given a list of directory names, generate some html for each album,
   including a thumbnail, album name, and number of items */
function buildAlbumHTML(albums: string[]): string {
  return albums
      .map(album => {
        const albumDir = path.join(GALLERY_DIR, album);
        // get all the images in this album and sort alphabetically
        const images = fs.readdirSync(albumDir)
                           .filter((f: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
                           .sort()

        if (images.length === 0) return '';

        // write photos.json for this album
        buildAlbumJSON(album, images);

        // use the first image as the thumbnail
        const firstImage = images[0];
        const thumb = `${URL_PATH}/${album}/${firstImage}`;

        const count = images.length;
        const albumName = prettifyName(album);

        return buildThumbHTML(
            `${URL_PATH}/album/?name=${album}`, thumb, `${albumName} (${count} items)`);
      })
      .join('\n');
}

export function buildGallery(): void {
  // scan for albums in media dir
  const albums =
      fs.readdirSync(GALLERY_DIR, {withFileTypes: true})
          .filter(d => d.isDirectory())
          .map(d => d.name)
          .sort((a, b) => {return a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())});

  if (albums.length === 0) {
    console.warn(`No albums found in ${GALLERY_DIR}`);
    return;
  }

  const albumsHTML = buildAlbumHTML(albums);

  // read template and replace gallery container contents with the generated html for the albums
  let html = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
  html = html.replace(
      /<div class="center" id="gallery-container">[\s\S]*?<\/div>/,
      `<div class="center" id="gallery-container">\n${albumsHTML}\n    </div>`);

  // write to index.html
  fs.writeFileSync(OUTPUT_FILE, html, 'utf-8');
  console.log(`${OUTPUT_FILE}: (${albums.length} albums)`);
}