# ICSF Website
A society information page for Imperial Sci-fi Fantasy Society.

## Prerequisites
- Node.js 20.19 or higher ([download](https://nodejs.org))
- Run `node --version` to check your current version

## Getting Started
- Run `npm install` after cloning the repo. 
- To run the website: 
  - `npm run build`. This builds the website
  - `npm run dev`. This will start a development server 
  at http://localhost:5173.

## Project Structure
### Source Code
- The project is structured in a feature-first pattern within the `src/`directory. This means that each page has its own folder in `src/`, in which are all relevant HTML/TypeScript files for that page.
- The homepage layout is at `src/index.html`, and the sitemap is at `src/sitemap.html`.
- There are also web components, including the header, footer, and navigation bar, which are reused on every page. These are located in `src/components`
- CSS styles are in `src/styles`

### Assets and Resources
- All assets are in the public/ directory, as configured in the `publicDir` parameter in the Vite config (`vite.config.ts`) 

## Building the Website
The website is built by running `npm run build`

### Step 1: src/build.ts
This script runs firsts, generating the `gallery` page, and the `publications` page, as these HTML pages are easier to automate than to write by hand.
- Gallery (`src/gallery/gallery.ts`): scans `public/gallery/` for album folders, uses the first image in each album as a thumbnail, and writes `src/gallery/index.html` to display the page. It also generates a `photos.json` inside each album folder, listing all of the photos in an album, which the album page fetches at runtime.
- Publications (`src/publications/publications.ts`): scans `public/publications/` for PDFs, parses the filename to extract the date, title and editor, and writes `src/publications/index.html` to display the page.

### Step 2: Vite
- Vite then compiles everything in `src/` into `dist/`. This is where the completely built website lives.

## Adding Content
### Add a Fanzine/Publication
- Name the file following this template: YYYY-MM_title_First-Last.pdf, where 'First' and 'Last' are the first and last names of the editor of the fanzine.
- Drop it into the folder `public/publications/` and rebuild the website.

### Add New Album in Gallery
- Simply drop a folder into `public/gallery/` and rebuild the website.

### Add a New Page
- Create a folder in `src/` with the page title, and add an `index.html`.
- Reuse the web components from `src/components/` for the site header, site footer, and navigation bar. This can be done by including them as scripts in the `<head>` section of the HTML, and then simply using them as tags like so: `<site-footer></site-footer>`. See any existing page's `index.html` for examples.
- If the page requires dynamic processing, like the `gallery` page, add a new step to `src/build.ts` to generate HTML in an automated fashion.

## Deployment

