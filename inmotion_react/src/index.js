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

import action_PathChange from './_redux/actions/navigation/action_PathChange';

// Hello!

const middleware = applyMiddleware(
    thunk, // See /src/_redux/lists/action_FetchLists for details on what 'thunk' is
    createLogger({
        collapsed: true, // Collapse the log in the console by default
        diff: true, // Log the differences between the previous and the new state
        predicate: (getState, action) => action.type.substr(0, 12) !== '@@redux-form' // Dont log to console the actions dispatched by redux-form because there are so many it can be spammy.
    })
);

const store = createStore(allReducers, middleware); // Create the store redux will use. See /src/_redux/reducers/index.js

// Configure manual control of router. For details see /src/_redux/actions/navigation/action_Navigation_PathChange.js
const history = createBrowserHistory();
history.listen((obj) => {
    store.dispatch(action_PathChange(obj.pathname))
});

// This is where we will redirect the user to a different page if state.navigation.redirectPath !== null. For details see /src/_redux/actions/navigation/action_Navigation_Redirect.js
store.subscribe(() => {
    const redirectPath = store.getState().navigationStore.redirectPath;
    if (redirectPath) {
        history.push(redirectPath);
    }
});

ReactDOM.render(
    //Provider allows us to user 'connect' to access the stores from components See ./components/Map.js
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
