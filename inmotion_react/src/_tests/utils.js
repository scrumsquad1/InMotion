import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../_redux/reducers/index';

export const getStore = () => {
    const middleware = applyMiddleware(thunk);
    return createStore(allReducers, middleware);
};