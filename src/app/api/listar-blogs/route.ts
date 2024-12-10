import { getBlogs } from '@/actions/blog'

export async function GET() {
  try {
    const blogs = await getBlogs()
    return new Response(JSON.stringify({ blogs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
