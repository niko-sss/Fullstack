import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Content = ({anecdote, votes}) => {
  return (
      <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
      </>
  )
}

const Vote = ({clickHandler}) => <button type='button' onClick={clickHandler}>vote</button>

const Button = ({clickHandler}) => <button type='button' onClick={clickHandler}>next anecdote</button>

const TopAnecdote = ({votes, anecdotes}) => {
  const emptyVotes = votes.every(vote => vote === 0)
  const maxVoteAmount = Math.max(...votes)
  function indexOfMax() {
      let maxIndex = 0
      for (let i = 1; i < votes.length; i++) {
          if (votes[i] > votes[maxIndex]) {
              maxIndex = i
          }
      }
      return maxIndex
  }
  if (!emptyVotes) {
    const maxIndex = indexOfMax()
    const topAnecdote = anecdotes[maxIndex]
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{topAnecdote}</p>
        <p>has {maxVoteAmount} votes</p>
      </div>
    )
  }
}

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const text = 'Anecdote of the day'

  const anecdoteAmount = anecdotes.length
  
  const [votes, setVotes] = useState(new Uint8Array(8))
  const [rngNumber, setRngNumber] = useState(0)
  const [selected, setSelected] = useState('If it hurts, do it more often.')

  const handleAnecdotes = () => {
    const updatedNumber = Math.floor(Math.random() * anecdoteAmount)
    const updatedAnecdote = anecdotes[updatedNumber]
    setSelected(updatedAnecdote)
    setRngNumber(updatedNumber)
    
  }

  const handleVote = () => {
    const votesCopy = votes.slice()
    votesCopy[rngNumber] += 1
    setVotes(votesCopy)
  }

  return (
    <>
    <div>
      <Header text={text}/>
      <Content anecdote={selected} votes={votes[rngNumber]}/>
    </div>
    <div>
      <Vote clickHandler={handleVote}/>
      <Button clickHandler={handleAnecdotes}/>
    </div>
    <div>
      <TopAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
    </>
  )
}

export default App