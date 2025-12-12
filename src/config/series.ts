export const SERIES = {
  rate: { id: 'DFF', source: 'FRED', fallback: 3.625 },
  yield10: { id: 'DGS10', source: 'FRED', fallback: 4.14 },
  gdp: { id: 'A191RL1Q225SBEA', source: 'FRED', fallback: 2.1 },
  inf: { id: 'CPIAUCSL', source: 'FRED', fallback: 2.8 },
  unemp: { id: 'UNRATE', source: 'FRED', fallback: 4.4 },
  oil: { id: 'PET.RWTC.D', source: 'EIA', fallback: 68 },
  spending: { fallback: 7.0 },
  corpTax: { fallback: 21 },
  incTax: { fallback: 0 },
  tariffs: { fallback: 3.0 },
  mig: { fallback: 2.0 },
  healthSub: { fallback: 5 },
  drugCaps: { fallback: 3 },
  deficit: { fallback: 1.8 },
  uninsured: { fallback: 8.0 },
  debt: { fallback: 36.8 }
} as const;

