const base = import.meta.env.BASE_URL;
export const URL_PATH = `${base}gallery`;

export function prettifyName(filename: string): string {
  const withoutExt = filename.replace(/\.[^.]+$/, '');
  return withoutExt.replace(/[-_]/g, ' ')
      .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1));
}