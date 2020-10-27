import * as types from './types';

export const getFavorites = () => ({
    type: types.GET_FAVORITES,
    payload: { state }
});

export const setFavorites = (favorites) => ({
    type: types.SET_FAVORITES,
    payload: favorites
});

export const addFavorites = (favorites) => ({
    type: types.ADD_FAVORITES,
    payload: favorites
});

export const removeFavorites = (id) => ({
    type: types.REMOVE_FAVORITES,
    payload: id
});

export const showSnackBarFavorites = (data) => ({
    type: types.SHOW_SNACKBAR_FAVORITES,
    payload: true
});

export const hideSnackBarFavorites = (data) => ({
    type: types.HIDE_SNACKBAR_FAVORITES,
    payload: false
});
