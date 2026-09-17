import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    const effectiveUserId = userId || "guest_teacher";

    const course = await db.course.create({
      data: {
        userId: effectiveUserId,
        title,
      },
    });
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.log('[COURSES]', error instanceof Error ? error.message : String(error));
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
