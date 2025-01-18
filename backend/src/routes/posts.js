import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPost,
  deletePost,
  createPost,
  updatePost,
} from "../services/posts.js"

export function postsRoutes(app) {
  app.get("/api/v1/posts", async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: "Filter by author or tag, not both" })
      } else if (author) {
        res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        res.json(await listPostsByTag(tag, options))
      } else {
        res.json(await listAllPosts(options))
      }
    } catch (err) {
      console.error(`Error listing posts:`, err)
      res.status(500).end()
    }
  })

  app.get("/api/v1/posts/:id", async (req, res) => {
    const { id } = req.params

    try {
      const post = await getPost(id)

      if (post === null) {
        res.status(404).json({ error: `Post with id ${id} does not exist` })
      } else {
        res.json(post)
      }
    } catch (err) {
      console.error(`Error getting post:`, err)
      res.status(500).end()
    }
  })

  app.post("/api/v1/posts", async (req, res) => {
    try {
      const post = await createPost(req.body)
      res.send(post)
    } catch (err) {
      console.error(`Error creating post:`, err)
      res.status(500).end()
    }
  })

  app.patch("/api/v1/posts/:id", async (req, res) => {
    const { id } = req.params

    try {
      const post = await updatePost(id, req.body)
      res.json(post)
    } catch (err) {
      console.error(`Error updating post:`, err)
      res.status(500).send()
    }
  })

  app.delete("/api/v1/posts/:id", async (req, res) => {
    const { id } = req.params

    try {
      const { deletedCount } = await deletePost(id)

      if (deletedCount === 0) return res.status(404).end()
      res.status(204).end()
    } catch (err) {
      console.error(`Error deleting post:`, err)
      res.status(500).end()
    }
  })
}
