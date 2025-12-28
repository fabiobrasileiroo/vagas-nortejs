import prisma from "@/lib/db";
import { JobParams } from "../schema-jobs";

type MaybePromise<T> = T | Promise<T>;

export async function GET(request: Request, { params }: { params: MaybePromise<JobParams> }) {
  const resolvedParams = await Promise.resolve(params);
  if (!resolvedParams || !resolvedParams.id) {
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

export async function DELETE(request: Request, { params }: { params: MaybePromise<JobParams> }) {
  const resolvedParams = await Promise.resolve(params);
  if (!resolvedParams || !resolvedParams.id) {
    return new Response(JSON.stringify({ message: 'Missing job id' }), { status: 400 });
  }
  const jobId = Number(resolvedParams.id);

  const existing = await prisma.job.findUnique({ where: { id: jobId } });
  if (!existing) {
    return new Response(JSON.stringify({ message: 'Job not found' }), { status: 404 });
  }

  await prisma.job.delete({ where: { id: jobId } });
  return new Response(null, { status: 204 });
}