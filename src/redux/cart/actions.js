import * as types from './types';

export const getCart = (state) => ({
    type: types.GET_CART,
    payload: {state}
});

export const setCart = (cart) => ({
    type: types.SET_CART,
    payload: cart 
});