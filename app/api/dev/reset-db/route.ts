import { NextResponse } from 'next/server';

import { resetDb, seedDb } from '@/prisma/seed-db';

function getDbNameFromDatabaseUrl(databaseUrl: string | undefined) {
  if (!databaseUrl) return null;
  try {
    const url = new URL(databaseUrl);
    const pathname = url.pathname.replace(/^\//, '');
    return pathname || null;
  } catch {
    return null;
  }
}

function isTestDatabaseUrl(databaseUrl: string | undefined) {
  const dbName = getDbNameFromDatabaseUrl(databaseUrl);
  if (!dbName) return false;

  const normalized = dbName.toLowerCase();
  return normalized === 'test' || normalized.endsWith('_test') || normalized.includes('test');
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    if (!isTestDatabaseUrl(process.env.DATABASE_URL)) {
      return NextResponse.json(
        { error: 'Not available in production' },
        { status: 404 },
      );
    }
  }

  const configuredToken = process.env.DEV_RESET_TOKEN;
  if (configuredToken) {
    const providedToken = request.headers.get('x-dev-reset-token');
    if (!providedToken || providedToken !== configuredToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  await resetDb();
  const result = await seedDb();

  return NextResponse.json({ ok: true, ...result });
}
