export async function convertRate(from = 'EUR') {
  const stored = localStorage.getItem('EUR_BDT');

  if (stored) {
    const { date, rate } = JSON.parse(stored);
    const storedTime = new Date(date).getTime();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (Date.now() - storedTime <= sevenDays) return { success: true, rate };
  }

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);

    if (!res.ok) throw new Error('Failed converting');

    const data = await res.json();
    const rate = data.rates.BDT;

    localStorage.setItem(
      'EUR_BDT',
      JSON.stringify({
        rate,
        date: new Date().toISOString(),
      }),
    );

    return { success: true, rate };
  } catch (error) {
    console.error('Error fetching: ' + error);
    return { success: false };
  }
}
