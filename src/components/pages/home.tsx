import usePostList from "../../hooks/queryHooks/posts/usePostList";

export default function HomePage() {
  const { data, isError, isLoading } = usePostList({ page: 1, limit: 10, sortBy: 'title', sortType: 'asc' })
  return (
    <div className="w-full overflow-x-hidden overflow-y-auto p-4">home</div>
  )
}
