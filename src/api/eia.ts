import { fetchJson } from './http';

const API_KEY = import.meta.env.VITE_EIA_API_KEY;

type EiaResp = { series: { data: [string, number][] }[] };

export async function getLatestEia(seriesId: string) {
  if (!API_KEY) throw new Error('Missing VITE_EIA_API_KEY');
  const url = `https://api.eia.gov/series/?api_key=${API_KEY}&series_id=${seriesId}`;
  const json = await fetchJson<EiaResp>(url);
  const data = json.series?.[0]?.data?.[0];
  if (!data) throw new Error(`No data for ${seriesId}`);
  return { value: data[1], date: data[0] };
}

