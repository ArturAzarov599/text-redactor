import rootReducer from "./rootReducer";
import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga"
import rootSaga from "./root-saga/root-sagas";

const saga = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(saga, logger))

saga.run(rootSaga)

export default store;
