import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [initialBlogs, setInitialBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setInitialBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
    }
  }, [user])



  // LOG OUT:
  // console: window.localStorage.removeItem('loggedUser')

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log(initialBlogs)
      setBlogs(initialBlogs.filter(blog => blog.user.username === user.username))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error){
      console.log(error)
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username:</label>
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  // const showBlogs = async () => {
  //   const sortedBlogs = blogs.sort((a, b) => a.likes + b.likes)
  //   const mappedBlogs = sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} setSuccessMessage={setSuccessMessage}/>)
  //   return mappedBlogs
  // }

  const logout = () => {
    try {
      window.localStorage.clear()
      setUser(null)
      setSuccessMessage('Logout was successful')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Logout failed!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {successMessage && <h2 style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</h2>}
      {errorMessage && <h2 style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</h2>}
      {!user && loginForm()}
      {user && (
        <div>
          <h2>Blogs</h2>
          {
            <form onSubmit={logout}>
              <p>
                {user.name} has logged in &nbsp;
                <button type='submit'>logout</button>
              </p>
            </form>
          }
          <br />
          {blogs && [...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              setSuccessMessage={setSuccessMessage}
            />)}
          <br />
          <br />
        </div>
      )}
      {user && <Togglable
        buttonLabel={'create new'}
        ref={noteFormRef}
        cancelButtonLabel={'cancel'}>
        <BlogForm
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setBlogs={setBlogs}
          blogs={blogs}
          noteFormRef={noteFormRef}
        />
      </Togglable>
      }
    </div>
  )
}

export default App
