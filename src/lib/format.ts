export function formatDate(dateString: string): string {
  if (!dateString) return 'Bilinmiyor';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatRuntime(minutes: number): string {
  if (!minutes) return 'Bilinmiyor';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}dk`;
  if (mins === 0) return `${hours}sa`;
  return `${hours}sa ${mins}dk`;
}

export function formatMoney(amount: number): string {
  if (!amount) return 'Bilinmiyor';

  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
