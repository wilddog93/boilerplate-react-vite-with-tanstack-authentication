import { PostEntity } from '@/entities/post.entities'
import { get } from '@/services/api'
import { useQueryData } from '@/hooks/useQueryData'
import { POSTS_GET } from '@/services/endpoint'

type PostListParams = {
  title?: string
  content?: string
  authorId?: string
  viewCount?: string
  published?: string
  page: number
  limit?: number
  sortBy?: string
  sortType?: string
}

const usePostList = ({ ...params }: PostListParams) =>
  useQueryData({
    queryKey: ['post-list', params],
    queryFn: () =>
      get<PostEntity[]>(POSTS_GET, {
        params,
      }),
  })

export default usePostList
