export const dynamic = "force-dynamic";
import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const CoursesPage = () => {
  return (
    <div className='p-6'>
      <Link href='/teacher/create'>
        <Button>Nuevos Cursos</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
