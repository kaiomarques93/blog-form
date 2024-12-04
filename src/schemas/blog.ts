import { string, z } from 'zod'

export const blogPostSchema = z.object({
  title: z.string().min(4),
  subtitle: z.string().min(4),
  description: z.string().min(10),
  author: z.string().min(4),
  date: z.any(),
  image: z.any().optional(),
  categories: string().array(),
  active: z.boolean(),
  featured: z.boolean(),
})

export type blogPostSchemaType = z.infer<typeof blogPostSchema>
