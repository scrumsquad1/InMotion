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
import action_InsertList from './_redux/actions/lists/action_InsertList';
import action_InsertTask from './_redux/actions/tasks/action_InsertTask';
import List from './data/List';
import Task from './data/Task';

const middleware = applyMiddleware(
    thunk,
    createLogger({
        collapsed: true,
        diff: true,
        predicate: (getState, action) => action.type.substr(0, 12) !== '@@redux-form'
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

    // dispatch(action_FetchLists());

    const seattleList = new List({
        lat: '47.6062',
        lng: '-122.3321',
        name: 'Seattle',
    });
    dispatch(action_InsertList(seattleList));

    const bellevueList = new List({
        lat: '47.6101',
        lng: '-122.2015',
        name: 'Bellevue',
    });
    dispatch(action_InsertList(bellevueList));

    let seattleTask1 = new Task({
        subject: 'Get Groceries',
        list: seattleList,
        priority: 0
    });
    dispatch(action_InsertTask(seattleTask1));

    let seattleTask2 = new Task({
        subject: 'Seahawks game',
        list: seattleList,
        priority: 0
    });
    dispatch(action_InsertTask(seattleTask2));

    let bellevueTask1 = new Task({
        subject: 'Bellevue Things',
        list: bellevueList,
        priority: 1
    });
    dispatch(action_InsertTask(bellevueTask1));

    let bellevueTask2 = new Task({
        subject: 'Bellevue Things 2',
        list: bellevueList,
        priority: 2
    });
    dispatch(action_InsertTask(bellevueTask2));

});

registerServiceWorker();
