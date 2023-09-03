import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    taskType : "Todo"
}

export const AppReducer = createReducer(initialState, {
    CHANGE_TASK_TYPE : (state , action) => {
        state.taskType = action.payload;
    }
});