import * as types from './types';
import { INITIAL_STATE } from './initialState';

const reducer = (state = INITIAL_STATE, action) => {
    const { payload, type , retryAction} = action;
    switch (type) {
        case types.SHOW_LOADING:
            return {
                ...state,
                showLoading: true,
            };
        case types.HIDE_LOADING:
            return {
                ...state,
                showLoading: payload,
            };
        case types.SET_SNACK_INFO:
            return {
                ...state,
                snackInfo: payload,
            };
        case types.SHOW_ERROR_CONNECTION:
            return {
                ...state,
                showErrorConnectionDialog: true,
                retryAction: payload
            };
        case types.HIDE_ERROR_CONNECTION:
            return {
                ...state,
                showErrorConnectionDialog: false,
            };
        default:
            return state;
    }
}
export default reducer;