import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLatestBaselines } from './api/baseline';
import { useStore } from './state/store';
import Layout from './components/Layout';
import ControlPanel from './components/ControlPanel';
import Dashboard from './components/Dashboard';
import StatusBar from './components/StatusBar';

function App() {
  const { setBaseline, setError, status } = useStore();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['baseline'],
    queryFn: getLatestBaselines,
    refetchInterval: 5 * 60_000
  });

  useEffect(() => {
    if (data) setBaseline(data);
  }, [data, setBaseline]);

  useEffect(() => {
    if (isError && error) setError(String(error));
  }, [isError, error, setError]);

  return (
    <Layout>
      <div className="flex h-screen overflow-hidden">
        <ControlPanel />
        <Dashboard />
      </div>
      <StatusBar loading={isLoading} error={status.error} updatedAt={status.updatedAt} />
    </Layout>
  );
}

export default App;

