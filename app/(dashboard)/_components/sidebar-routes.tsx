'use client';
import React from 'react';
import { Layout, Wrench, BookOpen, Newspaper, Landmark, Gamepad2, HelpCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

import SidebarItem from './sidebar-item';

const routes = [
  {
    icon: Layout,
    label: 'Inicio',
    href: '/',
  },
  {
    icon: Newspaper,
    label: 'Artículos',
    href: '/articulos',
  },
  {
    icon: Wrench,
    label: 'Herramientas',
    href: '/herramientas',
  },
  {
    icon: Landmark,
    label: 'Historia Monetaria',
    href: '/herramientas/historia-monetaria',
  },
  {
    icon: Gamepad2,
    label: 'Preciodle',
    href: '/juegos/preciodle',
  },
  {
    icon: HelpCircle,
    label: 'Real o Chamuyo',
    href: '/juegos/real-o-chamuyo',
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
