export default function getTags() {
  const posts = require('./posts.json')

  const tags = new Set(posts.flatMap((post) => post.tags))

  const uniqueTags = Array.from(tags)

  return uniqueTags.map((tag) => ({ key: tag }))
}
