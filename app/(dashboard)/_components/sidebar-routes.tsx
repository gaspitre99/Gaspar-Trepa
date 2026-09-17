'use client';
import React from 'react';
import { Compass, Layout, Wrench, BookOpen, GraduationCap, Coins, Wallet, Gamepad2, Flame, Newspaper, Landmark } from 'lucide-react';
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
    label: 'Inicio / Explorar',
    href: '/search',
  },
  {
    icon: Newspaper,
    label: 'Artículos',
    href: '/articulos',
  },
  {
    icon: GraduationCap,
    label: 'Cursos',
    href: '/courses',
  },
  {
    icon: Wrench,
    label: 'Herramientas',
    href: '/herramientas',
  },
  {
    icon: Coins,
    label: 'Monitor de Cotizaciones',
    href: '/herramientas/monitor',
  },
  {
    icon: Wallet,
    label: 'Comparador de Billeteras',
    href: '/herramientas/billeteras',
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
    icon: Flame,
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
