import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { createJobSchema } from './schema-jobs';
import { ZodError } from 'zod';
import { PER_PAGE, buildLinks, currentPageFunction, lastPageFunction, parseListQuery, readBody, skipFunction, sleep, toFunction } from './jobs-utils';
import Error from 'next/error';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { search, page, slow } = parseListQuery(url);

  if (slow) await sleep(1500);

  const where = search
    ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { company: { contains: search, mode: 'insensitive' as const } },
        { city: { contains: search, mode: 'insensitive' as const } },
      ],
    }
    : undefined;

  const total = await prisma.job.count({ where });
  const lastPage = lastPageFunction(total)
  const currentPage = currentPageFunction(page, lastPage);
  const skip = skipFunction(currentPage);

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { created_at: 'desc' },
    skip,
    take: PER_PAGE,
  });

  return NextResponse.json({
    data: jobs,
    links: buildLinks(url, lastPage, currentPage),
    meta: {
      current_page: currentPage,
      from: total === 0 ? null : skip + 1,
      last_page: lastPage,
      path: `${url.origin}${url.pathname}`,
      per_page: PER_PAGE,
      to: total === 0 ? null : toFunction(total, skip),
      total,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await readBody(request);
    const data = createJobSchema.parse(body);

    const created = await prisma.job.create({
      data: {
        title: data.title,
        company: data.company,
        company_website: data.company_website,
        city: data.city,
        state: data.state,
        schedule: data.schedule,
        salary: data.salary,
        description: data.description,
        requirements: data.requirements,
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err: Error | any) {
    if (err instanceof ZodError) {
      return NextResponse.json({ errors: err.issues }, { status: 422 });
    }

    const message = err?.message || 'Internal error';
    return NextResponse.json({ message }, { status: 500 });
  }
}