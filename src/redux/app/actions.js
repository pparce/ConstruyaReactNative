import * as types from './types';

export const showLoading = () => ({
    type: types.SHOW_LOADING,
    payload: true
});

export const hideLoading = () => ({
    type: types.HIDE_LOADING,
    payload: false
});

export const showErrorConnectionDialog = (action) => ({
    type: types.SHOW_ERROR_CONNECTION,
    payload: true,
    retryAction: action,
});

export const hideErrorConnectionDialog = () => ({
    type: types.SHOW_ERROR_CONNECTION,
    payload: false
});