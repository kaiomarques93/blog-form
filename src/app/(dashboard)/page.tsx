import { getBlogs } from '@/actions/blog'
import { CardGrid } from '@/components/card-grid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  const blogs = await getBlogs()

  return (
    <div className="container mx-auto py-10">
      <main className="container mx-auto">
        <div className="flex gap-8 items-center">
          <h1 className="text-3xl font-bold text-center my-8">Meus Blogs</h1>
          <Link href={'/novo-blog'}>
            <Button>Criar novo blog</Button>
          </Link>
        </div>
        <CardGrid items={blogs} />
      </main>
    </div>
  )
}
