import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middlewares = [thunk];
// if (__DEV__) {
//     const createDebugger = require("redux-flipper").default;
//     middlewares.push(createDebugger());
// }
export default createStore(reducer, applyMiddleware(...middlewares))