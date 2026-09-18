import React from 'react';
import dynamic from 'next/dynamic';

const RealOChamuyo = dynamic(() => import('@/components/games/real-o-chamuyo'), { ssr: false });

export default function RealOChamuyoPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-6">
      <RealOChamuyo />
    </div>
  );
}