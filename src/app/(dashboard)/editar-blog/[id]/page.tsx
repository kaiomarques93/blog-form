import EditBlog from '@/components/ui/edit-blog'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  if (!id) {
    return <div>Blog Post not found</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Edit Blog Post</h1>
      <EditBlog blogId={id} />
    </div>
  )
}
