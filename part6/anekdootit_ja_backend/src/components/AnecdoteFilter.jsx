import { useDispatch } from "react-redux"
import { filterByText } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const filterAnecdotes = (event) => {
    event.preventDefault()
    const filterText = event.target.value

    dispatch(filterByText(filterText))
  }

  return (
    <div style={{marginBottom: 20}}>
      <input type="text" name='filterer' onChange={event => filterAnecdotes(event)} />
    </div>
  )
}


export default AnecdoteFilter