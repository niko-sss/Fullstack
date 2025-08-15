import { useParams } from "react-router-dom"
import BlogStats from "./BlogStats"


const TheBlog = ({ blogs }) => {
  const { id } = useParams()
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <h2>blog app</h2>
      <h2>{blog.title}</h2>
      <BlogStats blog={blog} />
    </div>
  )
}

export default TheBlog