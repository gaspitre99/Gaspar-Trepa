import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Cursos",
  description: "Administra y gestiona los cursos que impartes en la plataforma.",
};

export const dynamic = "force-dynamic";

import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

const CoursesPage = async () => {
  const { userId } = auth();
  const safeUserId = userId || 'guest_teacher';

  const courses = await db.course.findMany({
    where: {
      userId: safeUserId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (courses.length === 0) {
    return (
      <div className='p-6 h-full flex flex-col items-center justify-center text-center space-y-4'>
        <h1 className='text-3xl font-bold'>Mis Cursos</h1>
        <p className='text-slate-500'>Aún no has creado ningún curso.</p>
        <Link href='/teacher/create'>
          <Button size="lg">Nuevo Curso</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <Link href='/teacher/create'>
        <Button>Nuevos Cursos</Button>
      </Link>
      <div className="mt-6">
        <p>You have {courses.length} courses.</p>
      </div>
    </div>
  );
};

export default CoursesPage;
