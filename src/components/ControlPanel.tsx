import { useState } from 'react';
import { Inputs } from '../types';
import { useStore } from '../state/store';

type SliderProps = {
  label: string;
  id: keyof Inputs;
  min: number;
  max: number;
  step: number;
  suffix?: string;
};

function Slider({ label, id, min, max, step, suffix }: SliderProps) {
  const val = useStore((s) => s.inputs[id]);
  const setInput = useStore((s) => s.setInput);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono">
          {val}
          {suffix ?? ''}
        </span>
      </div>
      <input
        className="w-full"
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => setInput(id, parseFloat(e.target.value))}
      />
    </div>
  );
}

export default function ControlPanel() {
  const [tab, setTab] = useState<'monetary' | 'fiscal' | 'social'>('monetary');
  return (
    <aside className="w-[340px] md:w-[400px] bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4">
      <div className="flex text-xs uppercase font-semibold">
        {(['monetary', 'fiscal', 'social'] as const).map((t) => (
          <button
            key={t}
            className={`flex-1 py-2 ${tab === t ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500'}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-6 overflow-y-auto">
        {tab === 'monetary' && (
          <>
            <Slider label="Fed Funds Rate" id="rate" min={0} max={8} step={0.25} suffix="%" />
            <Slider label="QT (Monthly $B)" id="qt" min={-100} max={100} step={10} suffix="B" />
          </>
        )}
        {tab === 'fiscal' && (
          <>
            <Slider label="Gov Spending ($T)" id="spending" min={5} max={9} step={0.1} suffix="T" />
            <Slider label="Corp Tax Rate" id="corpTax" min={15} max={35} step={1} suffix="%" />
            <Slider label="Indiv Tax Impact" id="incTax" min={-10} max={10} step={1} suffix="%" />
            <Slider label="Import Tariffs" id="tariffs" min={0} max={25} step={0.5} suffix="%" />
            <Slider label="Global Oil Price" id="oil" min={40} max={150} step={5} />
          </>
        )}
        {tab === 'social' && (
          <>
            <Slider label="Net Immigration (M)" id="mig" min={0} max={4} step={0.1} />
            <Slider label="ACA Subsidies" id="healthSub" min={0} max={10} step={1} />
            <Slider label="Drug Price Caps" id="drugCaps" min={0} max={10} step={1} />
          </>
        )}
      </div>
    </aside>
  );
}

