
import app from './app/reducer';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import  AsyncStorage from '@react-native-community/async-storage';

const reducers = combineReducers({
    app,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['app'],
    timeout: null
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}