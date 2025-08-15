import { useState } from 'react'
import blogService from '../services/blogs'
import { notify, clearNotify } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
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

const StyledInput = styled.input`
  &:focus {
  background-color: LightBlue;
  }
`

const BlogForm = ({
  blogs,
  noteFormRef,
  mockFunc
}) => {
  const dispatch = useDispatch()

  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const addBlog = () => {
    noteFormRef.current.toggleVisibility()
    if (author && title && url) {
        dispatch(createBlog({ title, author, url }))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        dispatch(notify({ text: 'Blog addition successful!', isError: false }))
        setTimeout(() => {dispatch(clearNotify())}, 5000)
    } else {
      dispatch(notify({ text: 'Insert data in every input field', isError: true }))
      setTimeout(() => {
        dispatch(clearNotify())
      }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault()
        const mockData = { title, author, url }
        mockFunc ? mockFunc(mockData) : addBlog()
      }}>
        <br/>
        <label htmlFor="blog-title">title:</label><StyledInput
          value={title}
          onChange={({ target }) => setNewTitle(target.value)}
          id='blog-title'
        />
        <br />
        <label htmlFor="blog-author">author:</label><StyledInput
          value={author}
          onChange={({ target }) => setNewAuthor(target.value)}
          id='blog-author'
        />
        <br />
        <label htmlFor="blog-url">url:</label><StyledInput
          value={url}
          onChange={({ target }) => setNewUrl(target.value)}
          id='blog-url'
        />
        <br />
        <br />
        <StyledButton type="submit">Create</StyledButton>
      </form>
    </>
  )
}

export default BlogForm