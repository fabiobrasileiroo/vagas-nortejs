export const PER_PAGE = 10;

export function toBoolean(value: string | null) {
  if (!value) return false;
  return value === 'true' || value === '1';
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseListQuery(url: URL) {
  const search = url.searchParams.get('search')?.trim() || undefined;
  const page = Math.max(1, Number(url.searchParams.get('page') || '1') || 1);
  const slow = toBoolean(url.searchParams.get('slow'));
  return { search, page, slow };
}

export function buildLinks(url: URL, lastPage: number, currentPage: number) {
  const base = `${url.origin}${url.pathname}`;
  const firstUrl = new URL(base);
  const lastUrl = new URL(base);

  const keep = (u: URL) => {
    const search = url.searchParams.get('search');
    const slow = url.searchParams.get('slow');
    if (search) u.searchParams.set('search', search);
    if (slow) u.searchParams.set('slow', slow);
  };

  keep(firstUrl);
  firstUrl.searchParams.set('page', '1');

  keep(lastUrl);
  lastUrl.searchParams.set('page', String(lastPage));

  const prev = currentPage > 1 ? new URL(base) : null;
  const next = currentPage < lastPage ? new URL(base) : null;

  if (prev) {
    keep(prev);
    prev.searchParams.set('page', String(currentPage - 1));
  }

  if (next) {
    keep(next);
    next.searchParams.set('page', String(currentPage + 1));
  }

  return {
    first: firstUrl.toString(),
    last: lastUrl.toString(),
    prev: prev ? prev.toString() : null,
    next: next ? next.toString() : null,
  };
}

export async function readBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return request.json();
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  }

  return request.json().catch(() => ({}));
}

// Helper functions for pagination
export const lastPageFunction = (total:number) => Math.max(1, Math.ceil(total / PER_PAGE));
export const currentPageFunction = (page:number, lastPage:number) => Math.min(page, lastPage);
export const skipFunction = (currentPage:number) => (currentPage - 1) * PER_PAGE;
export const toFunction = (total:number, skip:number) => total === 0 ? null : Math.min(skip + PER_PAGE, total);