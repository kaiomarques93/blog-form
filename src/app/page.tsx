import BlogPostForm from "@/components/blog-post-form";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Blog Post</h1>
      <BlogPostForm />
    </div>
  )
}
