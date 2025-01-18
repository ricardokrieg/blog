export const getPosts = async (queryParams = {}) => {
  const posts = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?${new URLSearchParams(
      queryParams
    )}`
  )
  return posts.json()
}

export const createPost = async (post) => {
  const createdPost = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...post, tags: post.tags.split(",") }),
  })
  return createdPost.json()
}
