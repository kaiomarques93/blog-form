import { getBlogById } from "@/actions/blog"
import BlogPostForm from "../blog-post-form"


export default async function EditBlog({blogId}: {blogId: string}) {
    const blogPost = await getBlogById(blogId)

    if (!blogPost) {
      return <div>Blog Post not found</div>
    }

  return (
    <BlogPostForm blogPost={blogPost}/>
  )
}
