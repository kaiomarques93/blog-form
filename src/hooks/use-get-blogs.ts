import { getBlogs } from '@/actions/blog'
import { useQuery } from '@tanstack/react-query'

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      return await getBlogs()
    },
  })
}
