import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    user: {},
}

export const UserReducer = createReducer(initialState, {
    LOAD_USER_REQUEST: (state) => {
        state.loading = true;
    },
    LOAD_USER_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    LOAD_USER_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    LOGIN_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },

    LOGOUT_SUCCESS: (state) => {
        state.user = {};
    },


    START_LOADER: (state) => {
        state.loading = true;
    },
    STOP_LOADER: (state) => {
        state.loading = true;
    },
});