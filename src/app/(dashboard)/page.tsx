'use client'

import { CardGrid } from '@/components/card-grid'
import { Button } from '@/components/ui/button'
import { useGetBlogs } from '@/hooks/use-get-blogs'
import Link from 'next/link'

export default function Home() {
  const { data: blogs, isError, isPending } = useGetBlogs()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>
        Error
        <pre>{JSON.stringify(isError, null, 2)}</pre>
      </div>
    )
  }

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
