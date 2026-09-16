import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to prevent hydration errors from localStorage usage
const Preciodle = dynamic(() => import('@/components/games/preciodle'), { ssr: false });

export default function PreciodlePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Preciodle />
    </div>
  );
}
