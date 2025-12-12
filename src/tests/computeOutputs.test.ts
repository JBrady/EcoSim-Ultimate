import { describe, it, expect } from 'vitest';
import { computeOutputs } from '../model/computeOutputs';
import coeffs from '../config/coeffs.json';
import { Baseline, Inputs } from '../types';

const baseline: Baseline = {
  rate: 3.625,
  qt: -50,
  spending: 7,
  corpTax: 21,
  incTax: 0,
  tariffs: 3,
  oil: 68,
  mig: 2,
  healthSub: 5,
  drugCaps: 3,
  gdp: 2.1,
  inf: 2.8,
  unemp: 4.4,
  yield10: 4.14,
  uninsured: 8,
  deficit: 1.8,
  healthInf: 3.3,
  debt: 36.8
};

describe('computeOutputs', () => {
  it('keeps baseline unchanged when inputs match baseline', () => {
    const inputs: Inputs = { ...baseline };
    const out = computeOutputs(inputs, baseline, coeffs);
    expect(out.gdp).toBeCloseTo(baseline.gdp);
    expect(out.inf).toBeCloseTo(baseline.inf);
    expect(out.unemp).toBeCloseTo(baseline.unemp);
  });

  it('increases yields when rates rise', () => {
    const inputs: Inputs = { ...baseline, rate: baseline.rate + 1 };
    const out = computeOutputs(inputs, baseline, coeffs);
    expect(out.yield10).toBeGreaterThan(baseline.yield10);
  });
});

