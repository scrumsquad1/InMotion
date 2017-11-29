import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../_redux/reducers/index'
import Location from '../data/Location'
import action_InsertLocation from '../_redux/actions/locations/action_InsertLocation';

it('action_InsertLocation works as expected', () => {

    const middleware = applyMiddleware(thunk);
    const store = createStore(allReducers, middleware);
    const newLocation = new Location({id: 100, lat: 123, lng: -123});
    store.dispatch(action_InsertLocation(newLocation)).then(() => {
        console.log('Done');
    });

});
