import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
  setSuccessMessage,
  setErrorMessage,
  setBlogs,
  blogs,
  noteFormRef
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
      <form onSubmit={addBlog}>
        title: <input
          value={title}
          onChange={({ target }) => setNewTitle(target.value)}
        />
        <br />
        author: <input
          value={author}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <br />
        url: <input
          value={url}
          onChange={({ target }) => setNewUrl(target.value)}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm