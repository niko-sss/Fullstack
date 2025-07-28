
import BlogStats from './BlogStats'
import Togglable from './Togglable'


const Blog = ({ blog, setSuccessMessage, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={{ marginBottom: 5, marginLeft: 5 }}>
        <span>
          {blog.title} {blog.author}<Togglable buttonLabel={'view'} cancelButtonLabel={'hide'}>
            <BlogStats
              blog={blog}
              setSuccessMessage={setSuccessMessage}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          </Togglable>
        </span>
      </div>
    </div>
  )
}

export default Blog