import zod from 'zod';

export const createJobSchema = zod.object({
  title: zod.string().min(3),
  description: zod.string().min(10),
  company: zod.string().min(2),
  city: zod.string().min(1),
  state: zod.string().min(1),
  company_website: zod.url(),
  schedule: zod.enum(['full-time', 'part-time', 'contract', 'internship']),
  salary: zod.coerce.number().int().nonnegative(),
  requirements: zod.string().min(1),
})

export const JobParams = zod.object({
  id: zod.string(),
});

export const JobQuery = zod.object({
  search: zod.string().optional(),
  page: zod.string().optional(),
  slow: zod.string().optional(),
});


export type CreateJobInputZod = zod.infer<typeof createJobSchema>;

export type JobParams = zod.infer<typeof JobParams>;
export type JobQuery = zod.infer<typeof JobQuery>;