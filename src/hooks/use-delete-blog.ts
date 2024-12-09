import { deleteBlog } from '@/actions/blog'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBlog,
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries({ queryKey: ['blogs'] })
      }
    },
  })
}
