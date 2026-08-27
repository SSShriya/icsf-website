import {BASE_URL} from '@/config.js';

export const URL_PATH = `${BASE_URL}gallery`;

export function prettifyName(filename: string): string {
  const withoutExt = filename.replace(/\.[^.]+$/, '');
  return withoutExt.replace(/[-_]/g, ' ')
      .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1));
}