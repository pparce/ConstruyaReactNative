import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import storeConfiguration from './redux/store';
import AppView from './App-View';
import { PersistGate } from 'redux-persist/integration/react';

function MyStack() {
    const { persistor, store } = storeConfiguration();
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppView /> 
            </PersistGate>
        </Provider>
    );
};
export default MyStack;