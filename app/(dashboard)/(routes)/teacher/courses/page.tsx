import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Cursos",
  description: "Administra y gestiona los cursos que impartes en la plataforma.",
};

export const dynamic = "force-dynamic";

import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui-primitives/page-header';
import { EmptyState } from '@/components/ui-primitives/empty-state';
import { Surface } from '@/components/ui-primitives/surface';

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
      <div className='p-6 max-w-4xl mx-auto'>
        <PageHeader
          label="Instructor"
          title="Mis Cursos"
          className="mb-8"
        />

        <EmptyState
          eyebrowText="Estado"
          title="No hay cursos creados"
          description="Comienza creando tu primer curso para compartir tus conocimientos."
          action={
            <Link href='/teacher/create'>
              <Button>Nuevo Curso</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
        <PageHeader
          label="Instructor"
          title="Mis Cursos"
          className="mb-8"
          action={
            <Link href='/teacher/create'>
              <Button>Nuevo Curso</Button>
            </Link>
          }
        />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <Surface
            key={course.id}
            as="article"
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            className="group relative hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors duration-200 animate-enter flex flex-col gap-4 justify-between"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100 line-clamp-2">{course.title}</h3>
              {course.isPublished ? (
                <span className="text-xs font-mono tabular-nums text-sky-500">Publicado</span>
              ) : (
                <span className="text-xs font-mono tabular-nums text-neutral-500">Borrador</span>
              )}
            </div>

            <Link href={`/teacher/courses/${course.id}`} className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-zinc-900 dark:text-zinc-100">
              Editar curso
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </Surface>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
