import usePostList from "@/hooks/query/posts/usePostList"
import { removeUndefinedObject } from "@/utils/helper"
import { Button, Card, CardFooter, CardHeader, Image, Pagination, Select, SelectItem } from "@nextui-org/react"
import { useMemo, useState } from "react"
import { FaChevronDown } from "react-icons/fa"

type Author = {
  id?: number | string
  name: string
  email: string
}
interface PostParams {
  id?: number
  title: string
  content: string
  published: boolean
  viewCount?: number
  author?: Author
  createdAt?: string
  updatedAt?: string
}

const optionsLimit = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
]

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(new Set(['10']));
  const [sortBy, setSortBy] = useState('title');
  const [sortType, setSortType] = useState('asc');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState<Author>({
    name: '', 
    email: '',
  });
  const [viewCount, setViewCount] = useState<number | any>(undefined);
  const [published, setPublished] = useState<boolean | any>(undefined);


  const options = useMemo(() => {
    const filteredParams = removeUndefinedObject({
      title,
      content,
      viewCount,
      published,
      author: removeUndefinedObject(author), // Also filter nested `author` properties
    });

    return {
      page,
      limit: Number(Array.from(limit)[0]) || 10,
      sortBy,
      sortType,
      ...filteredParams,
    };
  }, [page, limit, sortBy, sortType, title, content, author, viewCount, published])

  const { data } = usePostList(options);

  console.log(limit, 'limit')

  return (
    <div className="w-full max-w-screen-xl mx-auto my-10">
      <h1 className="text-center mb-5">Blogs</h1>
      <div className="gap-2 grid grid-cols-10 grid-rows-2 px-8">
        {data?.data.map((post) => (
          <Card key={post.id} className="col-span-12 sm:col-span-2 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                {post.title}
              </p>
              <h4 className="text-white font-medium text-large">{post.content}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={"https://nextui.org/images/card-example-2.jpeg"} 
            />
          </Card>
        ))}
      </div>
      <Pagination 
        className="mt-5"
        loop
        showControls 
        total={data?.pagination?.totalPages as number} 
        initialPage={page as number} 
        onChange={(page) => setPage(page)} 
      />

      <Select
        label="Limit"
        placeholder="Select limit"
        labelPlacement="inside"
        className="max-w-xs"
        disableSelectorIconRotation
        selectorIcon={<FaChevronDown />}
        selectedKeys={limit}
        onSelectionChange={setLimit as any}
      >
        {optionsLimit.map((num) => (
          <SelectItem key={num.value}>
            {num.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {limit}</p>
    </div>
    )
  }
