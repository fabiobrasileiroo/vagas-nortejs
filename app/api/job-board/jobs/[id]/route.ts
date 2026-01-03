import prisma from "@/lib/db";
import { JobParams } from "../schema-jobs";

export async function GET(request: Request, context: { params: Promise<JobParams> }) {
  const resolvedParams = await context.params;
  if (!resolvedParams?.id) {
    return new Response(JSON.stringify({ message: 'Missing job id' }), { status: 400 });
  }
  const jobId = Number(resolvedParams.id);

  // SELECT * FROM jobs WHERE id = jobId AND published = true
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return new Response(JSON.stringify({ message: 'Job not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ data: job }), { status: 200 });
}

export async function DELETE(request: Request, context: { params: Promise<JobParams> }) {
  const resolvedParams = await context.params;
  if (!resolvedParams?.id) {
    return new Response(JSON.stringify({ message: 'Missing job id' }), { status: 400 });
  }
  const jobId = Number(resolvedParams.id);

  try {
    const existing = await prisma.job.findUnique({ where: { id: jobId } });
    if (!existing) {
      return new Response(JSON.stringify({ message: 'Job not found' }), { status: 404 });
    }

    // Evita erro de FK quando existem comentários (MySQL tende a RESTRICT por padrão)
    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { jobId } }),
      prisma.job.delete({ where: { id: jobId } }),
    ]);

    return new Response(null, { status: 204 });
  } catch (err: any) {
    // Prisma error codes: https://www.prisma.io/docs/orm/reference/error-reference
    const code = err?.code as string | undefined;

    // Record to delete does not exist (race condition)
    if (code === 'P2025') {
      return new Response(JSON.stringify({ message: 'Job not found' }), { status: 404 });
    }

    // Foreign key constraint failed (caso ainda exista vínculo)
    if (code === 'P2003') {
      return new Response(
        JSON.stringify({ message: 'Cannot delete job due to related records' }),
        { status: 409 },
      );
    }

    const message = err?.message || 'Internal error';
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}