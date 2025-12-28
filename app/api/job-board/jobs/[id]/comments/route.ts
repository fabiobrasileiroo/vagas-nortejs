import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';

type MaybePromise<T> = T | Promise<T>;

export async function GET(
  _request: NextRequest,
  { params }: { params: MaybePromise<{ id: string }> }
) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id;
  if (!id) {
    return NextResponse.json({ message: 'Missing job id' }, { status: 400 });
  }

  const jobId = Number(id);
  if (Number.isNaN(jobId)) {
    return NextResponse.json({ message: 'Invalid job id' }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { jobId },
    orderBy: { created_at: 'desc' },
  });

  return NextResponse.json({
    data: comments.map((c) => ({
      id: c.id,
      job_id: c.jobId,
      author: c.author,
      content: c.content,
      created_at: c.created_at,
    })),
  });
}
