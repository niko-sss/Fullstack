import blogService from '../services/blogs'
const BlogStats = ({ blog, mockLike, setSuccessMessage, blogs, setBlogs }) => {

  const handleLike = () => {
    const newBlog = { ...blog, likes: blog.likes++ }
    blogService.put(newBlog)
      .then(returnedBlog => {console.log(returnedBlog)})
      .then(() => setSuccessMessage('Like successful'))
      .then(setTimeout(() => {
        setSuccessMessage(null)
      }, 5000))
      .catch((error) => console.log('errorHEREEE', error))
  }
  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      blogService.deleteById(blog.id)
        .then(setSuccessMessage('Deletion successful'))
        .then(setBlogs(blogs.filter(thisBlog => thisBlog.id !== blog.id)))
        .then(setTimeout(() => {
          setSuccessMessage(null)
        }, 5000))
        .catch((error) => console.log('errorHEREEE', error))
    }
  }
  return (
    <>
      <p style={{ margin: 0 }}>
        {blog.url}
      </p>
      <p style={{ margin: 0 }}>
      Likes {blog.likes} <button onClick={mockLike ? mockLike : handleLike}>Like</button>
      </p>
      <p style={{ margin: 0 }}>
        {blog.author}
      </p>
      <br />
      <button onClick={deleteBlog}>remove</button>
    </>
  )
}

export default BlogStats