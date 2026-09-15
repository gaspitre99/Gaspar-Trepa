import React from 'react';
import Sidebar from './_components/sidebar';
import Navbar from './_components/navbar';
import MarketTicker from '@/components/market-ticker';
import { MarketProvider } from '@/context/market-context';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MarketProvider>
      <div>
      <div className="fixed top-0 w-full z-[60]">
        <MarketTicker />
      </div>
      <div className='h-[80px] md:pl-56 fixed top-[40px] w-full z-50'>
        <Navbar />
      </div>
      <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 top-[40px] z-50'>
        <Sidebar />
      </div>
        <main className='md:pl-56 pt-[120px] h-full'>{children}</main>
      </div>
    </MarketProvider>
  );
};

export default DashboardLayout;
