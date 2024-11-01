import usePostList from "@/hooks/queryHooks/posts/usePostList"
import { useMemo, useState } from "react"

interface Posts {
  id: number
  title: string
  content: string
  published: boolean
  viewCount: number
  author: string
  createdAt: string
  updatedAt: string
}

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('title');
  const [sortType, setSortType] = useState('asc');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [viewCount, setViewCount] = useState('');
  const [published, setPublished] = useState('');


  const options = useMemo(() => ({
    filter: {
      title,
      content,
      authorId,
      viewCount,
      published
    },
    page,
    limit,
    sortBy,
    sortType,
    queryKey: 'post-list'
  }), [page, limit, sortBy, sortType, title, content, authorId, viewCount, published]);

  const { data, isLoading, error } = usePostList(options);

  return (
    <div>blogs</div>
  )
}
