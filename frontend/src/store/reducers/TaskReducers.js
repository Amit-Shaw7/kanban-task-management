import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    todo: null,
    doing: null,
    done: null
}

export const TaskReducer = createReducer(initialState, {

    ADD_TASK_SUCCESS: (state, action) => {
        state.todo = [...state.todo, action.payload];
    },
    EDIT_TASK_SUCCESS: (state, action) => {

        for (let i = 0; i < state.todo.length; i++) {
            if (state.todo[i]._id === action.payload.id) {
                state.todo[i].title = action.payload.data.title;
                state.todo[i].description = action.payload.data.description;
            }
        }
        for (let i = 0; i < state.doing.length; i++) {
            if (state.doing[i]._id === action.payload.id) {
                state.doing[i].title = action.payload.data.title;
                state.doing[i].description = action.payload.data.description;
            }
        }
        for (let i = 0; i < state.done.length; i++) {
            if (state.done[i]._id === action.payload.id) {
                state.done[i].title = action.payload.data.title;
                state.done[i].description = action.payload.data.description;
            }
        }
    },

    DELETE_TASK_SUCCESS: (state, action) => {
        state.todo = state.todo.filter((todo) => todo._id !== action.payload);
        state.doing = state.doing.filter((todo) => todo._id !== action.payload);
        state.done = state.done.filter((todo) => todo._id !== action.payload);
    },

    FETCH_TODO_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_TODO_SUCCESS: (state, action) => {
        state.loading = false;
        state.todo = action.payload
    },

    FETCH_DOING_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_DOING_SUCCESS: (state, action) => {
        state.loading = false;
        state.doing = action.payload
    },

    FETCH_DONE_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_DONE_SUCCESS: (state, action) => {
        state.loading = false;
        state.done = action.payload
    },

    UPDATE_TASKS: (state, action) => {
        state.todo = action.payload.active;
        state.doing = action.payload.running;
        state.done = action.payload.completed;
    },

    ADD_TASK_TO_TODO: (state, action) => {
        state.todo = [...state.todo, action.payload];
    },

    ADD_TASK_TO_DOING: (state, action) => {
        state.doing = [...state.doing, action.payload];
    },

    ADD_TASK_TO_DONE: (state, action) => {
        state.done = [...state.done, action.payload];
    }
});