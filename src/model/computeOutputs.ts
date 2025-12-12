import { Baseline, Inputs, Outputs, Coefficients } from '../types';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function computeOutputs(inputs: Inputs, baseline: Baseline, coeffs: Coefficients): Outputs {
  const d = {
    rate: inputs.rate - baseline.rate,
    qt: inputs.qt - baseline.qt,
    spending: inputs.spending - baseline.spending,
    corpTax: inputs.corpTax - baseline.corpTax,
    incTax: inputs.incTax - baseline.incTax,
    tariffs: inputs.tariffs - baseline.tariffs,
    oil: inputs.oil - baseline.oil,
    mig: inputs.mig - baseline.mig,
    healthSub: inputs.healthSub - baseline.healthSub,
    drugCaps: inputs.drugCaps - baseline.drugCaps
  };

  const newYield =
    Math.max(
      0,
      baseline.yield10 +
        d.rate * coeffs.yield10.rate +
        d.qt * coeffs.yield10.qt +
        d.spending * coeffs.yield10.spending +
        d.oil * coeffs.yield10.oil
    );

  const gdpShock =
    d.spending * coeffs.gdp.spending +
    d.rate * coeffs.gdp.rate +
    d.qt * coeffs.gdp.qt +
    d.tariffs * coeffs.gdp.tariffs +
    d.corpTax * coeffs.gdp.corpTax +
    d.incTax * coeffs.gdp.incTax +
    d.oil * coeffs.gdp.oil +
    d.mig * coeffs.gdp.mig +
    d.drugCaps * coeffs.gdp.drugCaps;

  const genInfShock =
    d.spending * coeffs.inf.spending +
    d.rate * coeffs.inf.rate +
    d.qt * coeffs.inf.qt +
    d.tariffs * coeffs.inf.tariffs +
    d.mig * coeffs.inf.mig +
    d.oil * coeffs.inf.oil +
    d.incTax * coeffs.inf.incTax;

  const medInfShock = d.drugCaps * coeffs.inf.drugCaps + d.healthSub * coeffs.inf.healthSub;
  const totalInfShock = genInfShock * 0.92 + medInfShock * 0.08;

  const potentialGdp = 2.0 + d.mig * 0.25;
  const actualGdp = baseline.gdp + gdpShock;
  const gap = actualGdp - potentialGdp;
  const unempShock = gap * coeffs.unempGap;

  const uninsShock = d.healthSub * coeffs.unins.healthSub + unempShock * coeffs.unins.unemp;

  const deficitShock =
    d.spending * coeffs.deficit.spending +
    d.healthSub * coeffs.deficit.healthSub +
    d.tariffs * coeffs.deficit.tariffs +
    d.corpTax * coeffs.deficit.corpTax +
    d.incTax * coeffs.deficit.incTax +
    d.rate * coeffs.deficit.rate;

  return {
    gdp: clamp(baseline.gdp + gdpShock, -5, 10),
    inf: clamp(baseline.inf + totalInfShock, -2, 20),
    unemp: clamp(baseline.unemp + unempShock, 2, 25),
    uninsured: clamp(baseline.uninsured + uninsShock, 0, 30),
    deficit: baseline.deficit + deficitShock,
    debt: baseline.debt + deficitShock * 0.6,
    yield10: newYield
  };
}

