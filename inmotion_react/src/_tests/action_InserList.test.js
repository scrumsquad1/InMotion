import React from 'react';
import {getStore} from './utils';

import Location from '../data/Location';
import List from '../data/List';
import {TYPE_LOCATIONS_INSERTLOCATION_COMPLETE} from '../_redux/actions/locations/action_InsertLocation';
import {TYPE_LISTS_INSERTLIST_COMPLETE} from '../_redux/actions/lists/action_InsertList';

it('action_InsertList works as expected', () => {

    const store = getStore();

    const newLocation = new Location({id: 0, lat: 123, lng: -123});
    store.dispatch({type: TYPE_LOCATIONS_INSERTLOCATION_COMPLETE, payload: newLocation});
    expect(store.getState().locationStore.locations.indexOf(newLocation) > -1).toBe(true);

    const newList = new List({location: newLocation, id: 0, name: 'FirstList'});
    store.dispatch({type: TYPE_LISTS_INSERTLIST_COMPLETE, payload: newList});
    expect(store.getState().listsStore.lists.indexOf(newList) > -1).toBe(true);

});
