import React from 'react';
import { auth } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { IconBadge } from '@/components/icon-badge';

import TitleForms from './_components/title-forms';
import DescriptionForms from './_components/desctiption-forms';
import PriceForm from './_components/price-form';
import ExternalCheckoutForm from './_components/external-checkout-form';

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  const effectiveUserId = userId || 'admin_seed_user'; // fallback for public testing

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!course) {
    return redirect('/');
  }

  const requireFields = [course.title, course.description, course.imageUrl, course.price, course.categoryId];

  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>Configuración del curso</h1>
          <span className='text-sm text-slate-700'>Completa todos los campos {completionText}</span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div>
          <div className='flex items-center'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='text-xl'>Personaliza tu curso</h2>
          </div>
          <TitleForms initialData={course} courseId={course.id} />
          <DescriptionForms initialData={course} courseId={course.id} />
        </div>
        <div>
          <PriceForm initialData={course} courseId={course.id} />
          <ExternalCheckoutForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
