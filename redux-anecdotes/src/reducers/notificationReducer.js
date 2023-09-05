import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNote(state, action) {
        return action.payload  
    },
  }
})

export const { setNote } = notificationSlice.actions

export const setNotification = (content, seconds) => {
    console.log(content)
    const milliseconds = seconds * 1000
    return dispatch => {
        dispatch(setNote(content))
        setTimeout(() => {
            dispatch(setNote(null))
        }, milliseconds)
    }

}

export default notificationSlice.reducer