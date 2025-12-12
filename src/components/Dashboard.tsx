import { useStore } from '../state/store';
import { Sparklines } from './Sparklines';
import { NewsFeed } from './NewsFeed';
import { SectorBars } from './SectorBars';
import './Dashboard.css';

export default function Dashboard() {
  const outputs = useStore((s) => s.outputs);
  const inputs = useStore((s) => s.inputs);
  if (!outputs) return <main className="flex-1 p-6">Loading...</main>;

  return (
    <main className="flex-1 p-6 space-y-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Real GDP" value={`${outputs.gdp.toFixed(1)}%`} color="text-emerald-400" />
        <Card title="Inflation (CPI)" value={`${outputs.inf.toFixed(1)}%`} color="text-orange-400" />
        <Card title="Unemployment" value={`${outputs.unemp.toFixed(1)}%`} color="text-purple-400" />
        <Card title="Uninsured Rate" value={`${outputs.uninsured.toFixed(1)}%`} color="text-pink-400" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-semibold text-slate-300">Fiscal Health</h3>
          <Bar label="Deficit ($T)" value={outputs.deficit} max={3.5} color="bg-red-500" />
          <Bar label="Debt-to-GDP" value={(outputs.debt / 30) * 100} max={150} color="bg-yellow-500" suffix="%" />
        </div>
        <SectorBars outputs={outputs} inputs={inputs} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Sparklines gdp={outputs.gdp} inf={outputs.inf} unemp={outputs.unemp} />
        <NewsFeed outputs={outputs} inputs={inputs} />
      </div>
    </main>
  );
}

function Card({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <p className="text-xs text-slate-400 uppercase">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function Bar({
  label,
  value,
  max,
  color,
  suffix
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const widthClass = `bar-width-${Math.round(pct)}`;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="font-mono text-white">
          {value.toFixed(2)}
          {suffix ?? ''}
        </span>
      </div>
      <div className="bar-track">
        <div className={`bar-fill ${color} ${widthClass}`} />
      </div>
    </div>
  );
}

