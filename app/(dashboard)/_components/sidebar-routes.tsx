'use client';
import React from 'react';
import { TrendingUp, Layout, Calculator, BookOpen, Gamepad2, Compass } from 'lucide-react';
import { usePathname } from 'next/navigation';

import SidebarItem from './sidebar-item';

const routes = [
  {
    icon: Layout,
    label: 'Inicio',
    href: '/',
  },
  {
    icon: TrendingUp,
    label: 'Cotizaciones',
    href: '/cotizaciones',
  },
  {
    icon: Calculator,
    label: 'Herramientas',
    href: '/herramientas',
  },
  {
    icon: BookOpen,
    label: 'Artículos',
    href: '/articulos',
  },
  {
    icon: Gamepad2,
    label: 'Preciodle / Juegos',
    href: '/juegos/preciodle',
  },
  {
    icon: Compass,
    label: 'Explorar / Cursos',
    href: '/search',
  },
  {
    icon: BookOpen,
    label: 'Modo Profesor',
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
