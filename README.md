This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
Installing dependencies

```bash
pnpm install prisma @types/node --save-dev \
pnpm install @prisma/client @prisma/adapter-mariadb dotenv
```

--save-dev === usado para instalar um pacote como uma dependência de desenvolvimento

## Prisma Migrate (MySQL) - Shadow DB

Se o prisma migrate dev reclamar que não consegue criar o shadow database (P3014/P1010), use um shadow DB fixo.

Este projeto usa a env SHADOW_DATABASE_URL (veja o arquivo .env) apontando para o banco vagas_nortejs_shadow.

Opção A (automático, volume novo):

- O docker-compose monta a pasta docker/mysql/init no docker-entrypoint-initdb.d
- O script docker/mysql/init/01-shadow.sql cria o banco vagas_nortejs_shadow e concede permissões
- Observação: scripts de init só rodam quando o volume do MySQL é criado pela primeira vez

Opção B (sem recriar volume):

1. chmod +x scripts/mysql-shadow.sh
2. ./scripts/mysql-shadow.sh

Depois rode:

1. npx prisma migrate dev
