import blogService from '../services/blogs'
import { notify, clearNotify } from '../reducers/notificationReducer'
import blogs, { voteForBlog, deleteFromDB } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: black;
  background-color: DarkOrange;
  border: solid 1px black;
  border-radius: 7px 7px;
  fornt-size: 1rem;
  cursor: pointer;
  transition: transform 0.1s ease,
    color 0.1s ease,
    background-color 0.1s ease,
    font-style 0.1s ease;

  &:hover {
    color: DarkOrange;
    background-color: black;
    font-style: bold;
    transform: scale(1.2);
  }
`

StyledButton
const BlogStats = ({ blog, mockLike }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(voteForBlog(newBlog))
      dispatch(notify({ text: 'Like successful!', isError: false }))
      setTimeout(() => {
        dispatch(clearNotify())
      }, 5000)
    } catch (error) {
      console.log('errorrrr:', error);
      dispatch(notify({ text: 'Like action failed!', isError: true }))
      setTimeout(() => {dispatch(clearNotify())}, 5000)
    }
  }
  
  const handleDeletion = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteFromDB(blog.id))
        dispatch(notify({ text: 'Deletion successful!', isError: false }))
        setTimeout(() => {
          dispatch(clearNotify())
        }, 5000)
      } catch (error) {
        console.log(error);
        dispatch(notify({ text: 'Deletion failed!', isError: true }))
        setTimeout(() => {dispatch(clearNotify())}, 5000)
      }
    }
  }
  return (
    <>
      <p style={{ margin: 0, padding: 3 }}>
        {blog.url}
      </p>
      <p style={{ margin: 0, padding: 3 }}>
      Likes {blog.likes} <StyledButton onClick={mockLike ? mockLike : handleLike}>Like</StyledButton>
      </p>
      <p style={{ margin: 0, padding: 3 }}>
        added by {blog.author}
      </p>
      <br />
      <StyledButton onClick={handleDeletion}>Remove</StyledButton>
    </>
  )
}

export default BlogStats