import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import user from './reducers/userReducer'
import blogService from './services/blogs'
import blogs, { initializeBlogs } from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    blogs: blogs,
    notification: notificationReducer,
    user: user
  }
})

blogService.getAll().then(blog =>
  store.dispatch(initializeBlogs())
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

store.subscribe(() => console.log(store.getState()))