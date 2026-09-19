import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to prevent hydration errors from localStorage usage
const Preciodle = dynamic(() => import('@/components/games/preciodle'), { ssr: false });

export default function PreciodlePage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-6">
      <Preciodle />
    </div>
  );
}
