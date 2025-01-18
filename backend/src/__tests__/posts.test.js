import mongoose from "mongoose"
import { describe, test, expect, beforeEach } from "@jest/globals"

import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPost,
  updatePost,
  deletePost,
} from "../services/posts.js"
import { Post } from "../db/models/post.js"

let createdPosts = []
beforeEach(async () => {
  await Post.deleteMany()
  createdPosts = []

  const posts = [
    {
      title: "Learning Redux",
      author: "Daniel Bugl",
      tags: ["redux"],
    },
    {
      title: "Learn React Hooks",
      author: "Daniel Bugl",
      tags: ["react"],
    },
    {
      title: "Full-Stack React Projects",
      author: "Daniel Bugl",
      tags: ["react", "nodejs"],
    },
    {
      title: "Guide to TypeScript",
    },
  ]
  for (const post of posts) {
    createdPosts.push(await new Post(post).save())
  }
})

describe("creating posts", () => {
  test("with all parameters should succeed", async () => {
    const post = {
      title: "A Post",
      contents: "A Content",
      author: "John Doe",
      tags: ["tag1", "tag2"],
    }
    const createdPost = await createPost(post)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)

    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test("without title should fail", async () => {
    const post = {
      contents: "A Content",
      author: "John Doe",
      tags: ["tag1", "tag2"],
    }

    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain("`title` is required")
    }
  })

  test("with minimal parameters should succeed", async () => {
    const post = {
      title: "A Post",
    }
    const createdPost = await createPost(post)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

describe("listing posts", () => {
  test("all posts should be listed", async () => {
    expect(await listAllPosts()).toHaveLength(4)
  })

  test("should support sorting", async () => {
    const posts = await listAllPosts({ sortBy: "title", sortOrder: "asc" })

    expect(posts[0].title).toBe("Full-Stack React Projects")
    expect(posts[1].title).toBe("Guide to TypeScript")
    expect(posts[2].title).toBe("Learn React Hooks")
    expect(posts[3].title).toBe("Learning Redux")
  })

  test("should filter by author", async () => {
    const posts = await listPostsByAuthor("Daniel Bugl")

    expect(posts).toHaveLength(3)
  })

  test("should filter by tag", async () => {
    const posts = await listPostsByTag("react")

    expect(posts).toHaveLength(2)
  })
})

describe("getting a post", () => {
  test("should return the full post", async () => {
    const post = await getPost(createdPosts[0]._id)
    expect(post.toObject()).toEqual(createdPosts[0].toObject())
  })

  test("should fail if the post does not exist", async () => {
    const post = await getPost("000000000000000000000000")
    expect(post).toBeNull()
  })
})

describe("updating posts", () => {
  test("should update the specified properties", async () => {
    await updatePost(createdPosts[0]._id, { title: "New title" })
    const post = await Post.findById(createdPosts[0]._id)
    expect(post.title).toEqual("New title")
  })

  test("should not update other properties", async () => {
    await updatePost(createdPosts[0]._id, { title: "New title" })
    const post = await Post.findById(createdPosts[0]._id)
    expect(post.author).toEqual("Daniel Bugl")
  })

  test("should update the updatedAt timestamp", async () => {
    await updatePost(createdPosts[0]._id, { title: "New title" })
    const post = await Post.findById(createdPosts[0]._id)
    expect(createdPosts[0].updatedAt.getTime()).toBeLessThan(
      post.updatedAt.getTime()
    )
  })

  test("should fail if the post does not exist", async () => {
    const post = await updatePost("000000000000000000000000", {
      title: "New title",
    })
    expect(post).toBeNull()
  })
})

describe("deleting posts", () => {
  test("should delete the post", async () => {
    const result = await deletePost(createdPosts[0]._id)
    expect(result.deletedCount).toEqual(1)
    expect(await Post.find()).toHaveLength(3)
    expect(await Post.findById(createdPosts[0]._id)).toBeNull()
  })

  test("should fail if the post does not exist", async () => {
    const result = await deletePost("000000000000000000000000")
    expect(result.deletedCount).toEqual(0)
  })
})
