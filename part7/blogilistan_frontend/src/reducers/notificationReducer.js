import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: null,
  isError: null,
};

const notificationSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    notify(state, action) {
      const text = action.payload.text;
      const isError = action.payload.isError;
      return { text, isError };
    },
    clearNotify(state, action) {
      return initialState;
    },
  },
});

export const { notify, clearNotify } = notificationSlice.actions;
export default notificationSlice.reducer;
