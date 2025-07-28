import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
  setSuccessMessage,
  setErrorMessage,
  setBlogs,
  blogs,
  noteFormRef,
  mockFunc
}) => {

  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    if (author && title && url) {
      blogService.create({ title, author, url, })
        .then(returnedBlog =>
          setBlogs(blogs.concat(returnedBlog))
        )
        .then(setNewAuthor(''))
        .then(setNewTitle(''))
        .then(setNewUrl(''))
        .then(setSuccessMessage('New blog created'))
        .then(setTimeout(() => {setSuccessMessage(null)}, 5000))
    } else {
      setErrorMessage('Enter data to each input field.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={(x) => {
        x.preventDefault()
        const mockData = { title, author, url }
        mockFunc ? mockFunc(mockData) : addBlog(x)
      }}>
        <label htmlFor="blog-title">title:</label><input
          value={title}
          onChange={({ target }) => setNewTitle(target.value)}
          id='blog-title'
        />
        <br />
        <label htmlFor="blog-author">author:</label><input
          value={author}
          onChange={({ target }) => setNewAuthor(target.value)}
          id='blog-author'
        />
        <br />
        <label htmlFor="blog-url">url:</label><input
          value={url}
          onChange={({ target }) => setNewUrl(target.value)}
          id='blog-url'
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm