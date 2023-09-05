import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anekdotes',
  initialState: [],
  reducers: {
    /* createAnecdote(state, action) {
      state.push(action.payload)
    }, */
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      console.log(anecdoteToVote)
      const changedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1 
      }

      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )     
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateLikesAnecdote(state, action) {
      console.log(action.payload)
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
    }
  },
})


export const { addVote, appendAnecdote, setAnecdotes, updateLikesAnecdote } = anecdoteSlice.actions

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

export const updateAnecdote = (id, object) => {
  console.log(id)
  console.log(object)
  const changedAnecdote = { 
    ...object, 
    votes: object.votes + 1 
  }
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
    console.log(updatedAnecdote)
    dispatch(updateLikesAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer