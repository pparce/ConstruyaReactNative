import * as types from './types';

export const showLoading = () => ({
    type: types.SHOW_LOADING,
    payload: {}
});

export const hideLoading = () => ({
    type: types.HIDE_LOADING,
    payload: {}
});