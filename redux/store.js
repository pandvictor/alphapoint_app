import {configureStore} from '@reduxjs/toolkit';
import CommonStateReducer from './CommonStateSlice';

export const store = configureStore({
  reducer: {
    CommonState: CommonStateReducer,
  },
});
