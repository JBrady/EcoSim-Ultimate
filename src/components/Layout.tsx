import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <div className="bg-slate-950 text-slate-100">{children}</div>;
}

