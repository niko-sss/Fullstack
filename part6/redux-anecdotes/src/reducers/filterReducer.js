import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filterer',
  initialState,
  reducers: {
    filterByText(state, action) {
      console.log('FILTERSLICE STATE', state)
      console.log('FILTERSLICE ACTION', action)
      const text = action.payload
      return text
    }
  }
})

export const { filterByText } = filterSlice.actions
export default filterSlice.reducer