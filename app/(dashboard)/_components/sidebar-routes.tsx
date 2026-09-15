'use client';
import React from 'react';
import { Compass, Layout, Wrench, BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';

import SidebarItem from './sidebar-item';

const routes = [
  {
    icon: Layout,
    label: 'Panel',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Explorar',
    href: '/search',
  },
  {
    icon: Wrench,
    label: 'Herramientas',
    href: '/herramientas',
  },
  {
    icon: BookOpen,
    label: 'Modo profesor',
    href: '/teacher/courses',
  }
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  );
};

export default SidebarRoutes;
