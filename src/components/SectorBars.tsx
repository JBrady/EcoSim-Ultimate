import { Outputs, Inputs } from '../types';
import './SectorBars.css';

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function SectorBars({ outputs, inputs }: { outputs: Outputs; inputs: Inputs }) {
  const housing = 50 - (outputs.yield10 - 4.14) * 20 + (inputs.mig - 2.0) * 8;
  const svc = 60 + (outputs.gdp - 2) * 10;
  const healthScore = 60 - (inputs.drugCaps - 3) * 5 + (inputs.healthSub - 5) * 4;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
      <h3 className="text-sm font-semibold text-slate-300">Sector Pulse</h3>
      <Sector label="Housing" score={housing} />
      <Sector label="Services" score={svc} />
      <Sector label="Healthcare/Pharma" score={healthScore} />
    </div>
  );
}

function Sector({ label, score }: { label: string; score: number }) {
  const val = clamp(score, 5, 100);
  const color = val < 30 ? 'text-red-500' : val < 50 ? 'text-yellow-500' : 'text-emerald-500';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="font-mono text-white">{val.toFixed(1)}</span>
      </div>
      <progress className={`sector-progress ${color}`} max={100} value={val} />
    </div>
  );
}

