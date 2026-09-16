"use client"
import React from 'react';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';

import { Button } from './ui/button';

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.includes('/chapter');
  return (
    <div className='flex gap-x-2 ml-auto'>
      {isTeacherPage || isPlayerPage ? (
        <Link href='/'>
          <Button size='sm' variant='ghost'>
            <LogOut className='h-4 w-4 mr-2' />
            Salir
          </Button>
        </Link>
      ) : (
        <Link href='/teacher/courses'>
          <Button size='sm' variant='ghost'>
            Modo profesor
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};

export default NavbarRoutes;
