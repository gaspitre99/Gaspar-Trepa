import React from 'react';
import Sidebar from './_components/sidebar';
import Navbar from './_components/navbar';
import MarketTicker from '@/components/market-ticker';
import DisclaimerMarquee from '@/components/disclaimer-marquee';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen flex flex-col'>
      <div className="fixed top-0 w-full z-[60]">
        <MarketTicker />
      </div>
      <div className='h-[80px] md:pl-56 fixed top-[36px] w-full z-50'>
        <Navbar />
      </div>
      <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 top-[36px] z-50'>
        <Sidebar />
      </div>
      <main className='md:pl-56 pt-[116px] flex-1 flex flex-col'>
        <div className="flex-1">{children}</div>
        <div className="mt-auto">
          <DisclaimerMarquee />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
