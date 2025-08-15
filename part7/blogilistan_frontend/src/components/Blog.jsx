
import BlogStats from './BlogStats'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



const StyledDiv = styled.section`
  background-color: DarkOrange;
  padding: 10px 0px 10px 5px;
  border: solid 1px black;
  border-radius: 5px 20px 20px 5px;
  margin: 0px 0px 5px 0px;
  transition: color 0.2s ease, background-color: 0.2s ease;

  a {
    color: black;
    text-decoration: none;
    transition: color 0.2s ease, font-weight 0.2s ease, word-spacing 0.2s ease;
    }

  &:hover {
    background-color: black;
      a {
      color: DarkOrange;
      font-weight: bold;
      word-spacing: 3px
      }
    }
  `

const Blog = ({ blog, blogs }) => {
  // const blogStyle = {
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    <div>
      <StyledDiv>
        <span>
          <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
        </span>
      </StyledDiv>
    </div>
  )
}

export default Blog