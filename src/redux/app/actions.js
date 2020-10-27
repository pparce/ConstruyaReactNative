import * as types from './types';

export const showLoading = () => ({
    type: types.SHOW_LOADING,
    payload: true
});

export const hideLoading = () => ({
    type: types.HIDE_LOADING,
    payload: false
});

export const setSnackInfo = (snack) => ({
    type: types.SET_SNACK_INFO,
    payload: snack
});

export const showErrorConnectionDialog = (action) => ({
    type: types.SHOW_ERROR_CONNECTION,
    payload: action,
});

export const hideErrorConnectionDialog = () => ({
    type: types.HIDE_ERROR_CONNECTION,
    payload: false
});