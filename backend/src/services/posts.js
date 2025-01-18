import { Post } from "../db/models/post.js"

export async function createPost({ title, contents, author, tags }) {
  const post = new Post({ title, contents, author, tags })
  return await post.save()
}

async function listPosts(
  query = {},
  { sortBy = "createdAt", sortOrder = "desc" } = {}
) {
  return Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options) {
  return listPosts({}, options)
}

export async function listPostsByAuthor(author, options) {
  return listPosts({ author }, options)
}

export async function listPostsByTag(tags, options) {
  return listPosts({ tags }, options)
}

export async function getPost(id) {
  return Post.findById(id)
}

export async function updatePost(id, { title, contents, author, tags }) {
  return Post.findOneAndUpdate(
    { _id: id },
    { $set: { title, contents, author, tags } },
    { new: true }
  )
}

export async function deletePost(id) {
  return Post.deleteOne({ _id: id })
}
