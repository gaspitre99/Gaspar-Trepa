'use client';
import React from 'react';
import { Compass, Layout, Calculator, BookOpen, Gamepad2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import SidebarItem from './sidebar-item';

const routes = [
  {
    icon: Layout,
    label: 'Panel',
    href: '/',
  },
  {
    icon: BookOpen,
    label: 'Artículos',
    href: '/articulos',
  },
  {
    icon: Calculator,
    label: 'Herramientas',
    href: '/herramientas',
  },
  {
    icon: Gamepad2,
    label: 'Preciodle',
    href: '/juegos/preciodle',
  },
  {
    icon: Compass,
    label: 'Explorar / Cursos',
    href: '/search',
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
