import * as fs from 'fs';
import * as path from 'path';

const EVENTS_FILE = './src/history/events.json';
const TEMPLATE_FILE = './src/history/history-template.html';
const OUTPUT_FILE = './src/history/index.html';

const ROW_HEIGHT_PX = 50;
const START_YEAR = 1976;

interface Event {
  date: string;
  title: string;
  link: string|null;
}

/* Parse the events JSON into a list of objects */
function parseEvents(): Event[] {
  return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8')) as Event[];
}

/* Calculate the vertical offset for an event based on its date */
function calculateOffset(date: string): number {
  const [mm = '1', yyyy = START_YEAR.toString()] = date.trim().split('/');
  const month = parseInt(mm);
  const year = parseInt(yyyy);
  const years = year - START_YEAR;
  return years * ROW_HEIGHT_PX + month * (ROW_HEIGHT_PX / 12) + 2;
}

/* Generate HTML for a single event div */
function buildEventHTML(event: Event): string {
  const offset = calculateOffset(event.date);

  if (event.link === null) {
    return `<div style="top: ${offset}px;">${event.title}</div>`;
  }

  return `<div style="top: ${offset}px;"><a href="${event.link}">${event.title}</a></div>`;
}

/* Generate the year rows for the timeline table */
function buildYearRows(currentYear: number): string {
  return Array
      .from(
          {length: currentYear - START_YEAR},
          (_, i) => `\t\t\t<tr><td>${START_YEAR + 1 + i}</td></tr>`)
      .join('\n');
}

export function buildHistory(): void {
  const events = parseEvents();
  const currentYear = new Date().getFullYear();
  const yearCount = currentYear - START_YEAR;

  const eventsHTML = events.map(buildEventHTML).join('\n');
  const yearRows = buildYearRows(currentYear);

  let html = fs.readFileSync(TEMPLATE_FILE, 'utf-8');

  // inject rowspan
  html = html.replace(/rowspan="\d*"/, `rowspan="${yearCount}"`);

  // inject events
  html = html.replace(/<!--YEAR-ROWS-->/, yearRows);
  html = html.replace(/<!--EVENTS-->/, eventsHTML);

  const totalHeight = yearCount * 50;

  html =
      html.replace(/id="container-cell"/, `id="container-cell" style="height: ${totalHeight}px;"`);

  fs.writeFileSync(OUTPUT_FILE, html, 'utf-8');
  console.log(`history/index.html (${events.length} events, ${yearCount} years)`);
}