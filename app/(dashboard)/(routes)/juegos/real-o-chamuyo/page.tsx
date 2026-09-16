import React from 'react';
import dynamic from 'next/dynamic';

const RealOChamuyo = dynamic(() => import('@/components/games/real-o-chamuyo'), { ssr: false });

export default function RealOChamuyoPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <RealOChamuyo />
    </div>
  );
}
