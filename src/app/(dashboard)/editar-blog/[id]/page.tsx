import { getBlogById } from '@/actions/blog'
import BlogPostForm from '@/components/blog-post-form'
import React from 'react'

type Props = {
    params: { id: string }
}

export default async function page({ params }: Props) {

  if (!params.id) {
    return <div>Blog Post not found</div>
  }

  const blogPost = await getBlogById(params.id)

  if (!blogPost) {
    return <div>Blog Post not found</div>
  }

 
  return (
    <div className="container mx-auto py-10">
    <h1 className="text-2xl font-bold mb-5">Edit Blog Post</h1>
    <BlogPostForm blogPost={blogPost}/>
  </div>
  )
}
