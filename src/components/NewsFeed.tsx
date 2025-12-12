import { Outputs, Inputs } from '../types';

export function NewsFeed({ outputs, inputs }: { outputs: Outputs; inputs: Inputs }) {
  const items: { t: string; c: string }[] = [];

  if (inputs.qt < -80) items.push({ t: 'Liquidity Crunch: Aggressive QT drains reserves, yields spike.', c: 'text-red-400' });
  else if (inputs.qt > 0) items.push({ t: 'QE Returns: Fed restarts asset purchases to stimulate markets.', c: 'text-green-400' });

  if (inputs.oil > 100) items.push({ t: 'Oil Shock: Prices surge, crushing consumer spending power.', c: 'text-red-400' });
  if (inputs.incTax > 2) items.push({ t: 'Tax Hike: Consumers pull back spending as take-home pay falls.', c: 'text-orange-400' });

  if (inputs.mig > 3.5) items.push({ t: 'Population Surge: Housing demand spikes, labor markets loosen.', c: 'text-blue-400' });
  if (outputs.uninsured > 12) items.push({ t: 'Coverage Crisis: Millions lose access to care as subsidies cut.', c: 'text-red-400' });
  if (outputs.inf > 5) items.push({ t: 'Inflation Alert: Prices heat up across the board.', c: 'text-red-400' });

  if (!items.length) items.push({ t: 'Market Update: Steady growth as policy stabilizes.', c: 'text-slate-400' });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      <h3 className="text-sm font-semibold text-slate-300">Live Simulation Feed</h3>
      {items.slice(0, 3).map((i, idx) => (
        <div key={idx} className="flex gap-2 text-xs text-slate-200">
          <span className={`material-symbols-outlined text-sm ${i.c}`}>breaking_news</span>
          <p className="border-b border-slate-800 pb-2 w-full">{i.t}</p>
        </div>
      ))}
    </div>
  );
}

