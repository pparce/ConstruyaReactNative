import * as types from './types';
import { INITIAL_STATE } from './initialState';

const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_LOGIN:
            return {
                ...state,
                login: payload.data,
            };
        case types.SET_LOGIN:
            return {
                ...state,
                login: payload,
                isLogin: Object.entries(payload).length ? true : false,
            };
        case types.SET_CREDENTIALS:
            return {
                ...state,
                credentials: payload,
            };
        default:
            return state;
    }
}
export default reducer;