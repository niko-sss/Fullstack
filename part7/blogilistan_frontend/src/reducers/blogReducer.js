import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      const updatedState = state.filter((blog) => blog.id !== id);
      return updatedState;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, deleteBlog, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteFromDB = (id) => {
  return async (dispatch) => {
    await blogService.deleteById(id);
    dispatch(deleteBlog(id));
  };
};

export const voteForBlog = (votedAnecdote) => {
  return async (dispatch) => {
    await blogService.put(votedAnecdote);
    dispatch(initializeBlogs());
  };
};
