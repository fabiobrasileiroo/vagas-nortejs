import { NextResponse, type NextRequest } from 'next/server';

function addCorsHeaders(response: NextResponse) {
  // Se quiser restringir, defina CORS_ORIGIN (ex: https://seu-site.vercel.app)
  const origin = process.env.CORS_ORIGIN ?? '*';

  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-dev-reset-token',
  );
  response.headers.set('Access-Control-Max-Age', '86400');

  return response;
}

export function proxy(request: NextRequest) {
  // Preflight
  if (request.method === 'OPTIONS') {
    return addCorsHeaders(new NextResponse(null, { status: 204 }));
  }

  return addCorsHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/api/:path*'],
};
