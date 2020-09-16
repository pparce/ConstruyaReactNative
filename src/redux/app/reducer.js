import * as types from './types';
import { INITIAL_STATE } from './initialState';

const reducer = (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
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
        case types.SHOW_ERROR_CONNECTION:
            return {
                ...state,
                showErrorConnectionDialog: payload,
                retryAction: action.retryAction
            };
        case types.HIDE_ERROR_CONNECTION:
            return {
                ...state,
                showErrorConnectionDialog: payload,
            };
        default:
            return state;
    }
}
export default reducer;