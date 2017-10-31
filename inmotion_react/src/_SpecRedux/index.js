import baseAction from './actions/BaseAction';
import fetchAction from './actions/FetchAction';
import singleFireAction from './actions/SingleFireAction';
import {combineReducers} from 'redux';

export const BaseAction = baseAction;
export const FetchAction = fetchAction;
export const SingleFireAction = singleFireAction;

export const states = {
    UNINITIALIZED: "Uninitialized",
    LOADING: "Loading",
    COMPLETE: "Complete",
    ERROR: "Error"
};

export const combineActions = (actions) => {

    let reducerObject = {};
    actions.forEach((action) => {

        if (!reducerObject[action.storeName])
            reducerObject[action.storeName] = [];

        reducerObject[action.storeName].push(action);

    });

    let out = {};
    Object.keys(reducerObject).forEach((param) => {
        out[param] = buildReducers(reducerObject[param]);
    });

    return combineReducers(out);

};

function buildReducers(actions) {

    let defaultState = {};

    actions.forEach((a) => {

        if (!a instanceof BaseAction)
            throw new Error(`${a} + is not an action`);

        defaultState = {...defaultState, ...a.defaultFields}

    });

    return (state = defaultState, action) => {

        let newState = {};

        actions.forEach(a => newState = {...newState, ...a.reducer(state, action)});

        return {...state, ...newState};

    }

}