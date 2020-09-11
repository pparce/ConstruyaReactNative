import * as sagas from './index';

const initSagas = sagaMiddleware => {
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;
