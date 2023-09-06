import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './reducers/UserReducer';
import { TaskReducer } from './reducers/TaskReducers';
import { AppReducer } from './reducers/AppReducer';

export const Store = configureStore({
  reducer: {
    user : UserReducer,
    task : TaskReducer,
    app : AppReducer
  },
});