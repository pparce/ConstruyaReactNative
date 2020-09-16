import * as types from './types';
import { INITIAL_STATE } from './initialState';

const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_CART:
            return {
                ...state,
                cart: payload.data,
            };
        case types.SET_CART:
            return {
                ...state,
                cart: payload,
                showCart: payload.items.length > 0 ? true : false,
            };
        case types.SHOW_SNACKBAR:
            return {
                ...state,
                showSnackBar: payload,
            };
        case types.HIDE_SNACKBAR:
            return {
                ...state,
                showSnackBar: payload,
            };
        default:
            return state;
    }
}
export default reducer;