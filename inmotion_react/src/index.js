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
import allReducers from './actions'
import Home from './components/Home';
import onStart from './_Resources/onStart'

const middleware = applyMiddleware(thunk, createLogger({
    collapsed: true,
    diff: true,
    predicate: (getState, action) => action.type.substr(0, 12) !== '@@redux-form'
}));

const store = createStore(allReducers, middleware);

// Configure manual control of router
const history = createBrowserHistory();
history.listen((obj) => {
    // store.dispatch(ACTION_PATH_CHANGE(obj.pathname))
});

// let currentPage = history.currentPage.location.pathname;
store.subscribe(() => {
    const redirectPath = store.getState().navigation.redirectPath;
    if (redirectPath) {
        history.push(redirectPath);
    }
});

onStart(store.dispatch);

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

registerServiceWorker();
