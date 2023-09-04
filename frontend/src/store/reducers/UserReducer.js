import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    user: null,
}

export const UserReducer = createReducer(initialState, {
    LOAD_USER_SUCCESS: (state, action) => {
        state.user = action.payload;
    },

    LOGIN_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },

    LOGOUT_SUCCESS: (state) => {
        state.user = {};
        state.loading = false;
    },


    START_LOADER: (state) => {
        state.loading = true;
    },
    STOP_LOADER: (state) => {
        state.loading = true;
    },
});