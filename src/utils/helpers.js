export function formatCurrency(value, currency = 'BDT') {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(value);
}

export function convertCurrency(value, rate) {
  return Math.round(value * rate).toFixed(2);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
}
