import { SERIES } from '../config/series';
import { Baseline } from '../types';
import { getLatestFred } from './fred';
import { getLatestEia } from './eia';

export async function getLatestBaselines(): Promise<Baseline> {
  const tasks = [
    getLatestFred(SERIES.rate.id),
    getLatestFred(SERIES.yield10.id),
    getLatestFred(SERIES.gdp.id),
    getLatestFred(SERIES.inf.id),
    getLatestFred(SERIES.unemp.id),
    getLatestEia(SERIES.oil.id)
  ];

  const [rate, y10, gdp, inf, unemp, oil] = await Promise.allSettled(tasks);

  const pick = (r: PromiseSettledResult<any>, key: keyof typeof SERIES) =>
    r.status === 'fulfilled'
      ? { value: r.value.value, date: r.value.date }
      : { value: SERIES[key].fallback, date: undefined };

  const rateV = pick(rate, 'rate');
  const y10V = pick(y10, 'yield10');
  const gdpV = pick(gdp, 'gdp');
  const infV = pick(inf, 'inf');
  const unempV = pick(unemp, 'unemp');
  const oilV = pick(oil, 'oil');

  const latestDate = [rateV.date, y10V.date, gdpV.date, infV.date, unempV.date, oilV.date]
    .filter(Boolean)
    .sort()
    .pop();

  return {
    rate: rateV.value,
    qt: -50,
    spending: SERIES.spending.fallback,
    corpTax: SERIES.corpTax.fallback,
    incTax: SERIES.incTax.fallback,
    tariffs: SERIES.tariffs.fallback,
    oil: oilV.value,
    mig: SERIES.mig.fallback,
    healthSub: SERIES.healthSub.fallback,
    drugCaps: SERIES.drugCaps.fallback,
    gdp: gdpV.value,
    inf: infV.value,
    unemp: unempV.value,
    yield10: y10V.value,
    uninsured: SERIES.uninsured.fallback,
    deficit: SERIES.deficit.fallback,
    healthInf: 3.3,
    debt: SERIES.debt.fallback,
    timestamp: latestDate
  };
}

