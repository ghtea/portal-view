import createSagaMiddleware, { END } from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import logger from 'redux-logger';

import reducerRoot from './store/reducers';
import sagaRoot from './store/sagas';



const sagaMiddleware = createSagaMiddleware();

// type State = ReturnType<typeof reducerRoot>;



const store = createStore(
    reducerRoot,
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(sagaRoot);
    

export default store;

// redux-logger:   https://github.com/LogRocket/redux-logger
// old:   https://kamang-it.tistory.com/entry/React13reduxsaga%EB%A1%9C-%EB%B9%84%EB%8F%99%EA%B8%B0-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
// https://redux-saga.js.org/