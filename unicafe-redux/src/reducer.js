const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newState = {...state}
  switch (action.type) {
    case 'GOOD':
      let goodState = state.good + 1
      newState = {...state, good: goodState  }
      return newState
    case 'OK':
      let okState = state.ok + 1
      newState = {...state, ok: okState  }
      return newState
    case 'BAD':
      let badState = state.bad + 1
      newState = {...state, bad: badState  }
      return newState
    case 'ZERO':
      newState = initialState
      return newState
    default: return state
  }
  
}

export default counterReducer
