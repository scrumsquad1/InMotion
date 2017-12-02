import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {Route, Router} from 'react-router-dom';
import Header from './components/Header';
import {createBrowserHistory} from 'history';
import allReducers from './_redux/reducers'
import Home from './components/Home';

import action_InitialLoad from "./_redux/actions/action_InitialLoad";
import action_PathChange from './_redux/actions/navigation/action_PathChange';

const middleware = applyMiddleware(
    thunk,
    createLogger({
        collapsed: true,
        diff: true
    }),
);

const store = createStore(allReducers, middleware);

const history = createBrowserHistory();
history.listen((obj) => {
    store.dispatch(action_PathChange(obj.pathname))
});

store.subscribe(() => {
    const redirectPath = store.getState().navigationStore.redirectPath;
    if (redirectPath) {
        history.push(redirectPath);
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div className='App'>
                <Header/>
                <Route exact path='/' component={Home}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// Fetch data on start
store.dispatch((dispatch) => {
    dispatch(action_InitialLoad());
});

registerServiceWorker();
