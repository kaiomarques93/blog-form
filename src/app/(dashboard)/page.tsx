import { getBlogs } from "@/actions/blog";
import { CardGrid } from "@/components/card-grid";

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto py-10">
      <main className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Minha Coleção de Blogs</h1>
      <CardGrid items={blogs} />
    </main>
    </div>
  )
}
