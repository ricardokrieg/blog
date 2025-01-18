import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { CreatePost } from "./components/CreatePost.jsx"
import { PostFilter } from "./components/PostFilter.jsx"
import { PostSorting } from "./components/PostSorting.jsx"
import { PostList } from "./components/PostList.jsx"

import { getPosts } from "./api/posts.js"

export function Blog() {
  const [filter, setFilter] = useState("")
  const [filterBy, setFilterBy] = useState("author")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("ascending")

  const postsQuery = useQuery({
    queryKey: ["posts", { [filterBy]: filter, sortBy, sortOrder }],
    queryFn: () => getPosts({ [filterBy]: filter, sortBy, sortOrder }),
  })
  const posts = postsQuery.data ?? []

  return (
    <div>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        fields={["author", "tag"]}
        filterBy={filterBy}
        value={filter}
        onChange={setFilter}
        onFilterByChange={setFilterBy}
      />
      <br />
      <PostSorting
        fields={["createdAt", "updatedAt"]}
        value={sortBy}
        onChange={setSortBy}
        orderValue={sortOrder}
        onOrderChange={setSortOrder}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
