import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const updateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  price: z.coerce.number().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  externalCheckoutUrl: z.string().optional().nullable(),
});

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const validatedData = updateCourseSchema.safeParse(values);

    if (!validatedData.success) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const course = await db.course.update({
      where: { id: courseId, userId },
      data: { ...validatedData.data },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log('[COURSE_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
