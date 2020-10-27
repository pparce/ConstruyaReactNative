import * as types from './types';
import { INITIAL_STATE } from './initialState';
import ReduxService from '../../services/redux.service';

const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_FAVORITES:
            console.log(state);
            return state.favorites;
        case types.SET_FAVORITES:
            return {
                ...state,
                favorites: payload
            };
        case types.ADD_FAVORITES:
            let favorites = state.favorites;
            if (!favorites.map(e => { return e.id }).includes(payload.id)) {
                favorites.push(payload);
            }
            return {
                ...state,
                favorites: favorites
            };
        case types.REMOVE_FAVORITES:
            let listFavorites = state.favorites.filter(element => element.id != payload);
            return {
                ...state,
                favorites: listFavorites
            };
        case types.SHOW_SNACKBAR_FAVORITES:
            return {
                ...state,
                showSnackBar: payload,
            };
        case types.HIDE_SNACKBAR_FAVORITES:
            return {
                ...state,
                showSnackBar: payload,
            };
        default:
            return state;
    }
}
export default reducer;