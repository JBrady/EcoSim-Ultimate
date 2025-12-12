import { create } from 'zustand';
import { Baseline, Inputs, Outputs, Coefficients } from '../types';
import coeffsJson from '../config/coeffs.json';
import { computeOutputs } from '../model/computeOutputs';

type Status = { loading: boolean; error?: string; updatedAt?: string };

type State = {
  baseline: Baseline | null;
  inputs: Inputs;
  outputs: Outputs | null;
  coeffs: Coefficients;
  status: Status;
  setBaseline: (b: Baseline) => void;
  setInput: <K extends keyof Inputs>(key: K, val: Inputs[K]) => void;
  setError: (error: string) => void;
  recompute: () => void;
};

const defaultInputs: Inputs = {
  rate: 3.625,
  qt: -50,
  spending: 7.0,
  corpTax: 21,
  incTax: 0,
  tariffs: 3.0,
  oil: 68,
  mig: 2.0,
  healthSub: 5,
  drugCaps: 3
};

export const useStore = create<State>((set, get) => ({
  baseline: null,
  inputs: defaultInputs,
  outputs: null,
  coeffs: coeffsJson as Coefficients,
  status: { loading: true },
  setBaseline: (b) => {
    set({ baseline: b, status: { loading: false, updatedAt: b.timestamp } });
    get().recompute();
  },
  setInput: (key, val) => {
    set({ inputs: { ...get().inputs, [key]: val } });
    get().recompute();
  },
  setError: (error) => set({ status: { ...get().status, error, loading: false } }),
  recompute: () => {
    const { baseline, inputs, coeffs } = get();
    if (!baseline) return;
    const outputs = computeOutputs(inputs, baseline, coeffs);
    set({ outputs });
  }
}));

