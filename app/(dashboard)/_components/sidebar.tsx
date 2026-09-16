import React from 'react';
import Logo from './logo';
import SidebarRoutes from './sidebar-routes';

const Sidebar = () => {
  return (
    <div className='h-full border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto bg-white dark:bg-slate-900'>
      <div className='p-6'>
        <Logo />
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
