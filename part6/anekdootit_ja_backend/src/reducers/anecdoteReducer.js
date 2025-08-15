import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // voteAnecdote(state, action) {
    //   return state.map(anecdote => 
    //     anecdote.id === action.payload
    //       ? {...anecdote, votes: anecdote.votes + 1}
    //       : anecdote
    //   )
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = votedAnecdote => {
  return async dispatch => {
    await anecdoteService.put(votedAnecdote)
    dispatch(initializeAnecdotes())
  }
}

export default anecdoteSlice.reducer