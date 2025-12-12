import { fetchJson } from './http';

const FRED_BASE = 'https://api.stlouisfed.org/fred';
const API_KEY = import.meta.env.VITE_FRED_API_KEY;

type FredObsResponse = { observations: { value: string; date: string }[] };

export async function getLatestFred(seriesId: string) {
  if (!API_KEY) throw new Error('Missing VITE_FRED_API_KEY');
  const url = `${FRED_BASE}/series/observations?series_id=${seriesId}&api_key=${API_KEY}&file_type=json&sort_order=desc&limit=1`;
  const json = await fetchJson<FredObsResponse>(url);
  const obs = json.observations[0];
  const value = parseFloat(obs?.value ?? 'NaN');
  if (Number.isNaN(value)) throw new Error(`NaN for ${seriesId}`);
  return { value, date: obs.date };
}

