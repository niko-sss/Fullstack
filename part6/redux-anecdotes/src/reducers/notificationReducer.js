import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    notify(state, action) {
      const text = action.payload
      return text
    }
  }
})

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer