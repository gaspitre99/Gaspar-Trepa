'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: LucideIcon;
  href: string;
  label: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (pathname === '/' && href === '/') || pathname === href || pathname?.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type='button'
      className={cn(
        'flex items-center gap-x-2 text-neutral-300 text-sm font-[500] pl-6 transition-all hover:text-neutral-50 hover:bg-neutral-800/50',
        isActive && 'text-sky-400 bg-sky-950/30 hover:bg-sky-950/30 hover:text-sky-400'
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <Icon size={22} className={cn('text-neutral-300', isActive && 'text-sky-400')} />
        {label}
      </div>
      <div
        className={cn('ml-auto opacity-0 border-2 border-sky-500 h-full transition-all', isActive && 'opacity-100')}
      />
    </button>
  );
};

export default SidebarItem;
