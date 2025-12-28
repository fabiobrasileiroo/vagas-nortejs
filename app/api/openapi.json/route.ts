import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const serverUrl = url.origin;

  return NextResponse.json({
    openapi: '3.0.3',
    info: {
      title: 'Job Board API',
      version: '1.0.0',
    },
    servers: [{ url: serverUrl }],
    paths: {
      '/api/job-board/jobs': {
        get: {
          summary: 'Listagem de vagas',
          parameters: [
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'slow', in: 'query', schema: { type: 'boolean' } },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
        post: {
          summary: 'Criar vaga',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: [
                    'title',
                    'company',
                    'company_website',
                    'city',
                    'state',
                    'schedule',
                    'salary',
                    'description',
                    'requirements',
                  ],
                  properties: {
                    title: { type: 'string' },
                    company: { type: 'string' },
                    company_website: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    schedule: {
                      type: 'string',
                      enum: ['full-time', 'part-time', 'contract', 'internship'],
                    },
                    salary: { type: 'integer' },
                    description: { type: 'string' },
                    requirements: { type: 'string' },
                  },
                  example: {
                    title: 'Desenvolvedor Backend',
                    company: 'Amazon',
                    company_website: 'https://amazon.com',
                    city: 'Seattle',
                    state: 'WA',
                    schedule: 'full-time',
                    salary: 8000,
                    description: 'Estamos procurando um desenvolvedor backend com experiência em APIs e Node.js.',
                    requirements: 'Experiência com Node.js, TypeScript e bancos relacionais.'
                  }
                },
              },
              'application/x-www-form-urlencoded': {
                schema: { type: 'object' },
              },
            },
          },
          responses: {
            '201': { description: 'Criado' },
            '422': { description: 'Validação falhou' },
          },
        },
      },
      '/api/job-board/jobs/{id}': {
        get: {
          summary: 'Vaga individual',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
            { name: 'slow', in: 'query', schema: { type: 'boolean' } },
          ],
          responses: {
            '200': { description: 'OK' },
            '404': { description: 'Não encontrada' },
          },
        },
        delete: {
          summary: 'Apagar vaga',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
          ],
          responses: {
            '204': { description: 'No Content' },
            '404': { description: 'Não encontrada' },
          },
        },
      },
      '/api/job-board/jobs/{id}/comments': {
        get: {
          summary: 'Comentários da vaga',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
          ],
          responses: {
            '200': { description: 'OK' },
          },
        },
      },
    },
  });
}
