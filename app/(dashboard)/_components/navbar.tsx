import React from 'react';

import MobileSidebar from './mobile-sidebar';

import NavbarRoutes from '@/components/navbar-routes';

const Navbar = () => {
  return (
    <div className='p-4 border-b border-neutral-800 h-full flex items-center bg-neutral-950 text-neutral-50 shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
