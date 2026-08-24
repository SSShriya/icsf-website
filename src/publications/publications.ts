import * as fs from 'fs';

const FANZINES_DIR = './public/publications';
const URL_PATH = '/publications'
const TEMPLATE_FILE = './src/publications/publications-template.html';
const OUTPUT_FILE = './src/publications/index.html';

/* Given already formatted: date of fanzine, link to fanzine, title, and editor,
   generate html for the publication */
function buildPubHTML(date: string, href: string, title: string, editor: string): string {
  return `<tr>
            <td>${date}</td>
            <td><a href="${href}" target="_blank">${title}</a></td>
            <td>${editor}</td>
          </tr>`;
}

/* Given a list of unformatted fanzine names, return html */
function buildAllPubsHTML(fanzines: string[]): string {
  return fanzines
      .map(fanzine => {
        const [date = '', title = '', editor = ''] = fanzine.replace('.pdf', '').split('_');
        const href = `${URL_PATH}/${fanzine}`;
        const parsedDate =
            new Date(`${date}-01`).toLocaleDateString('en-GB', {month: 'short', year: 'numeric'})

        // parse the title by removing dashes
        // and replacing all 'Wyrms' with a full title including date
        let parsedTitle = title.replace(/-/g, ' ');
        if (parsedTitle == 'Wyrm') {
          parsedTitle = `Wyrmtongue: ${parsedDate}`
        }

        const parsedEditor = editor.replace(/-/g, ' ');
        return buildPubHTML(parsedDate, href, parsedTitle, parsedEditor);
      })
      .join('\n');
}

export function buildPublications(): void {
  const fanzines = fs.readdirSync(FANZINES_DIR, {withFileTypes: true})
                       .filter(f => f.isFile() && f.name.endsWith('.pdf'))
                       .map(f => f.name)

  if (fanzines.length === 0) {
    console.warn(`No fanzines found in ${FANZINES_DIR}`);
    return;
  }

  const pubsHTML = buildAllPubsHTML(fanzines);

  // read template and replace table contents with the generated html
  let html = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
  html = html.replace(
      /<table cellpadding="2" class="bodyLight">[\s\S]*?<\/table>/,
      `<table cellpadding="2" class="bodyLight">\n${pubsHTML}\n </table>`);

  fs.writeFileSync(OUTPUT_FILE, html, 'utf-8');
  console.log(`${OUTPUT_FILE}: (${fanzines.length} fanzines`);
}