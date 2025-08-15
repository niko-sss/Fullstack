import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { notify, clearNotify } from './reducers/notificationReducer'
import {
  BrowserRouter,
  Routes, Route, Link, useParams,
  useNavigate,
  Navigate
} from 'react-router-dom'
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import UserList from './components/UserList'
import UserData from './components/UserData';
import Notification from './components/Notification';
import { clearUser, setUser } from './reducers/userReducer';
import userService from './services/users'
import TheBlog from './components/TheBlog';
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
    transform: scale(1.3);
  }
`;

const StyledTogglable = styled.div`
  color: black;
  background-color: DarkOrange;
`

const StyledLink = styled(Link)`
  color: DarkOrange;
  font-size: 120%;
  text-decoration: none;
  transition: transform 0.3s ease,
    color 0.3s ease,
    font-weight 0.3s ease;

  &:hover {
    color: black;
    font-weight: bold;
    transform: scale(1.2);
  }
`;

const StyledDiv = styled.section`
  color: black
  background-color: Orange;
  transition: color 0.2s ease, background-color: 0.2s ease;

  &:hover {
    color: DarkOrange;
    background-color: black
  }
`

const StyledInput = styled.input`
  &:focus {
  background-color: LightBlue;
  }
`

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword
}) => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
      navigateTo('/blogs')
    } catch (error) {
      console.log(error);
      dispatch(notify({ text: 'Authentication failed!', isError: true }));
      setTimeout(() => {
        dispatch(clearNotify());
      }, 5000);
    }
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username:</label>
          <StyledInput
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <StyledInput
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br/>
        <StyledButton type="submit">Login</StyledButton>
      </form>
    </>
  )

}

const Menu = ({ user }) => {
  return (
    <div>
      <StyledLink to={'/blogs'}>Blogs</StyledLink>
      &nbsp;
      &nbsp;
      <StyledLink to={'/users'}>Users</StyledLink>
      &nbsp;
      Logged in as {user.name}
    </div>
  )
}

const App = () => {
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([])
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const noteFormRef = useRef();

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await userService.getAll()
      setUsers(allUsers)
    }
    getUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);


  const logout = () => {
    try {
      window.localStorage.clear();
      dispatch(clearUser())
      dispatch(notify({ text: 'Authentication successful!', isError: false }));
      setTimeout(() => {
        dispatch(clearNotify());
      }, 5000);
    } catch (exception) {
      console.log(exception);
      dispatch(notify({ text: 'Authentication failed!', isError: true }));
      setTimeout(() => {
        dispatch(clearNotify());
      }, 5000);
    }
  };

  return (
    <BrowserRouter>
      <div style={{
        borderRadius: '0px 50px 50px 15px',
        borderStyle: 'solid',
        borderInlineColor: 'black',
        padding: '10px 5px 20px 10px'
      }}>
        <Notification />
        {!user && (
          <Routes>
            <Route path='/*' element={ <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            /> } />
          </Routes>)}
        {user && (
          <Routes>
            <Route path='/' element={
              <div>
                <Menu user={user} />
                <Navigate to={'/blogs'} />
              </div>
            } />
            <Route path='/blogs' element={
              <div>
                <Menu user={user} />
                <h2>Blogs</h2>
                {
                  <form onSubmit={logout}>
                    <p>
                      {user.name} has logged in &nbsp;
                      <StyledButton type="submit">Logout</StyledButton>
                    </p>
                  </form>
                }
                <br />
                {blogs &&
                  [...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <Blog
                        key={blog.id}
                        blog={blog}
                        blogs={blogs}
                      />
                    ))}
                <br />
                <br />
                <Togglable
                  buttonLabel={'Create new'}
                  ref={noteFormRef}
                  cancelButtonLabel={'Cancel'}
                  >
                  <BlogForm
                    blogs={blogs}
                    noteFormRef={noteFormRef}
                    />
                </Togglable>
              </div>
            }/>
            <Route path='/users' element={
              <div>
                <Menu user={user} />
                <h2>Blogs</h2>
                {
                  <form onSubmit={logout}>
                    <p>
                      {user.name} has logged in &nbsp;
                      <StyledButton type="submit">Logout</StyledButton>
                    </p>
                  </form>
                }
                <br />
              <UserList
                blogs={blogs}
                users={users}
              />
              </div>
            } />
            <Route path='/users/:id' element={
              <div>
                <Menu user={user} />
                <UserData users={users} blogs={blogs}/>
              </div>
            }/>
            <Route path='/blogs/:id' element={
              <div>
                <Menu user={user} />
                <TheBlog blogs={blogs}/>
              </div>
            } />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
