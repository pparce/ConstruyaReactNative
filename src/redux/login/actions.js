import * as types from './types';

export const getLogin = (login) => ({
    type: types.GET_LOGIN,
    payload: {login}
});

export const setLogin = (login) => ({
    type: types.SET_LOGIN,
    payload: login 
});

export const setCredentials = (credentials) => ({
    type: types.SET_CREDENTIALS,
    payload: credentials 
});


/* export const showSnackBar = (data) => ({
    type: types.SHOW_SNACKBAR,
    payload: true 
});

export const hideSnackBar = (data) => ({
    type: types.HIDE_SNACKBAR,
    payload: false 
}); */
