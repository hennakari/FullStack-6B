import { useSelector, useDispatch } from 'react-redux'
import { addVote, updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.anecdotes
    } else {
      let filteredAnecdotes =  state.anecdotes.filter(function(anecdote) {
        return anecdote.content.includes(state.filter)
      })
      return filteredAnecdotes
    }
  })

  let sortedAnecdotes = [...anecdotes]
  if (sortedAnecdotes.length > 0) {
    console.log(sortedAnecdotes)
    sortedAnecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = (id) => {
    dispatch(addVote(id))
    let votedAnecdote = anecdotes.find(anecdote => anecdote.id === id) 
    dispatch(updateAnecdote(id, votedAnecdote))
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 10))
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
