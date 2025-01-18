import PropTypes from "prop-types"

export function Post({ title, contents, author, tags }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          written by <strong>{author}</strong>
          <br />
        </em>
      )}
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}
