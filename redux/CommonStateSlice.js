import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  is_logged_in: false,
};

export const ExpireTokenSlice = createSlice({
  name: 'CommonState',
  initialState,
  reducers: {
    setIsLoggedIn:  (state, action) => {
      state.is_logged_in = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {setIsLoggedIn} = ExpireTokenSlice.actions;

export default ExpireTokenSlice.reducer;
