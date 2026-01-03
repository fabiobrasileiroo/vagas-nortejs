import prisma from '@/lib/db';

export async function seedDb() {
  await prisma.comment.deleteMany();
  await prisma.job.deleteMany();

  const jobsData = [
    {
      title: 'Desenvolvedor Backend',
      company: 'Amazon',
      company_website: 'https://amazon.com',
      city: 'Seattle',
      state: 'WA',
      schedule: 'full-time',
      salary: 8000,
      description: 'Estamos procurando um desenvolvedor backend para se juntar à nossa equipe.',
      requirements: 'Experiência com Node.js, APIs REST e bancos relacionais.',
    },
    {
      title: 'Desenvolvedor Frontend',
      company: 'NorteJS',
      company_website: 'https://nortejs.org',
      city: 'Belém',
      state: 'PA',
      schedule: 'full-time',
      salary: 6000,
      description: 'Vaga para frontend com foco em Next.js e boas práticas de UI.',
      requirements: 'Experiência com React/Next.js, CSS e consumo de APIs.',
    },
    {
      title: 'Estágio em Desenvolvimento',
      company: 'Startup X',
      company_website: 'https://example.com',
      city: 'Manaus',
      state: 'AM',
      schedule: 'internship',
      salary: 1500,
      description: 'Estágio para aprender na prática com mentoria e desafios reais.',
      requirements: 'Noções de JavaScript/TypeScript e vontade de aprender.',
    },
    {
      title: 'QA / Testes Automatizados',
      company: 'Acme',
      company_website: 'https://acme.com',
      city: 'São Paulo',
      state: 'SP',
      schedule: 'contract',
      salary: 7000,
      description: 'Garantir qualidade com testes automatizados e pipeline CI.',
      requirements: 'Experiência com testes (unit/e2e) e boas práticas de qualidade.',
    },
    {
      title: 'Desenvolvedor Fullstack',
      company: 'Tech Co',
      company_website: 'https://tech.co',
      city: 'Curitiba',
      state: 'PR',
      schedule: 'part-time',
      salary: 5000,
      description: 'Atuação em features ponta a ponta, do banco ao frontend.',
      requirements: 'React/Node, SQL e experiência entregando features.',
    },
  ] as const;

  const createdJobs = [] as { id: number }[];

  for (const data of jobsData) {
    const created = await prisma.job.create({
      data: { ...data },
      select: { id: true },
    });
    createdJobs.push(created);
  }

  if (createdJobs.length > 0) {
    await prisma.comment.createMany({
      data: [
        {
          jobId: createdJobs[0].id,
          author: 'John Doe',
          content: 'Interessante vaga, estou interessado.',
        },
        {
          jobId: createdJobs[0].id,
          author: 'Jane Smith',
          content: 'Gostaria de saber mais detalhes sobre a vaga.',
        },
        {
          jobId: createdJobs[1]?.id ?? createdJobs[0].id,
          author: 'Alice Johnson',
          content: 'Qual é o prazo para se candidatar?',
        },
      ],
    });
  }

  return { jobsCreated: createdJobs.length };
}

export async function resetDb() {
  await prisma.comment.deleteMany();
  await prisma.job.deleteMany();
}
