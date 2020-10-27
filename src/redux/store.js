
import app from './app/reducer';
import cart from './cart/reducer';
import login from './login/reducer';
import favorites from './favorites/reducer';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const reducers = combineReducers({
    app,
    cart,
    login,
    favorites
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cart', 'login', 'favorites'],
    timeout: null
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}