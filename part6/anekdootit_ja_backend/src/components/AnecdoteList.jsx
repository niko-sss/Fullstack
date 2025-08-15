import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state.anecdotes)
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    if (state.anecdotes === null || state.anecdotes === undefined) {
      return []
    }
    return state.filter !== ''
      ? state.anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase()))
      : state.anecdotes
  })

  
  const vote = (id) => {
    console.log('iddddddddddddd', id)
    const anecdoteToVoteFor = anecdotes.find((anecdote) => anecdote.id === id)
    const updatedAnecdote = {...anecdoteToVoteFor, votes: anecdoteToVoteFor.votes + 1}
    dispatch(voteAnecdote(updatedAnecdote))
    dispatch(notify(`You liked ${anecdotes.find((anecdote) => anecdote.id === id).content}`))
    setTimeout(() => {
      dispatch(notify(''))
    }, 5000)

  }


  return (
    <div>
      {[...anecdotes]
        .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))
      }
  </div>)
}

export default AnecdoteList