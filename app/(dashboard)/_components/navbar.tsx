import React from 'react';

import MobileSidebar from './mobile-sidebar';

import NavbarRoutes from '@/components/navbar-routes';

const Navbar = () => {
  return (
    <div className='p-4 border-b border-slate-800 h-full flex items-center bg-[#0A101D] text-white shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
