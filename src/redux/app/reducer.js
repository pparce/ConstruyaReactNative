import * as types from './types';
import { INITIAL_STATE } from './initialState';

const reducer = (state = INITIAL_STATE, action) => {
    const { type } = action;
    switch (type) {
        case types.SHOW_LOADING:
            return {
                ...state,
                showLoading: true,
            };
        case types.HIDE_LOADING:
            return {
                ...state,
                showLoading: false,
            };
        case types.SHOW_ERROR_CONNECTION:
            return {
                ...state,
                showErrorConnectionDialog: true,
            };
        default:
            return state;
    }
}
export default reducer;