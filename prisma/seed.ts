import prisma from '@/lib/db';
import { seedDb } from './seed-db';

async function main() {
  await seedDb();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
