import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { createPost } from "../api/posts"

export function CreatePost() {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [tags, setTags] = useState("")
  const [contents, setContents] = useState("")

  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, contents, author, tags }),
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label htmlFor="create-author">Author: </label>
        <input
          type="text"
          name="create-author"
          id="create-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label htmlFor="create-tags">Tags: </label>
        <input
          type="text"
          name="create-tags"
          id="create-tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <br />

      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      ></textarea>
      <br />
      <br />

      <input
        type="submit"
        value={createPostMutation.isPending ? "Creating..." : "Create"}
        disabled={!title | createPostMutation.isPending}
      />
      {createPostMutation.isSuccess && (
        <>
          <br />
          Post created successfully!
        </>
      )}
    </form>
  )
}
