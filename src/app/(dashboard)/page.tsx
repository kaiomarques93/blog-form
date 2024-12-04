import { getBlogs } from "@/actions/blog";

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Blogs</h1>
      {blogs.map((blog) => {
        return <div key={blog.id}>{blog.title}</div>;
      })}
    </div>
  )
}
