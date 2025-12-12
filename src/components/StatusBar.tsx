export default function StatusBar({ loading, error, updatedAt }: { loading: boolean; error?: string; updatedAt?: string }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-4 py-2 text-xs text-slate-400 flex justify-between">
      <span>{loading ? 'Loading baselines…' : error ? `Error: ${error}` : 'Live baselines loaded'}</span>
      <span>{updatedAt ? `Updated: ${updatedAt}` : ''}</span>
    </footer>
  );
}

