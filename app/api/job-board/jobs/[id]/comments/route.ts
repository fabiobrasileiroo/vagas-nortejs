import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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
