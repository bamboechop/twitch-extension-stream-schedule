// Format date according to user's locale
export function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
  }).format(date);
}