import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Filler } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Filler);

const baseOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } }
};

export function Sparklines({ gdp, inf, unemp }: { gdp: number; inf: number; unemp: number }) {
  const mkData = (color: string, val: number) => ({
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [{ data: [2.5, 2.9, 1.4, 3.0, 2.3, val], borderColor: color, backgroundColor: `${color}20`, fill: true }]
  });
  return (
    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Spark title="GDP" data={mkData('#10b981', gdp)} />
      <Spark title="Inflation" data={mkData('#f97316', inf)} />
      <Spark title="Unemployment" data={mkData('#a855f7', unemp)} />
    </div>
  );
}

function Spark({ title, data }: { title: string; data: any }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-28">
      <p className="text-xs text-slate-400 mb-2">{title}</p>
      <div className="h-16">
        <Line data={data} options={baseOpts as any} />
      </div>
    </div>
  );
}

