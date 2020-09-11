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
        default:
            return state;
    }
}
export default reducer;