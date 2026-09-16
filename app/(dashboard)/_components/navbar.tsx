import React from 'react';

import MobileSidebar from './mobile-sidebar';

import NavbarRoutes from '@/components/navbar-routes';

const Navbar = () => {
  return (
    <div className='p-4 border-b border-slate-200 dark:border-slate-800 h-full flex items-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
