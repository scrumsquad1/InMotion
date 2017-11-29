import React from 'react';
import {getStore} from './utils';

import Location from '../data/Location';
import {TYPE_LOCATIONS_INSERTLOCATION_COMPLETE} from '../_redux/actions/locations/action_InsertLocation';

it('action_InsertLocation works as expected', () => {

    const store = getStore();

    const newLocation = new Location({id: 0, lat: 123, lng: -123});
    store.dispatch({type: TYPE_LOCATIONS_INSERTLOCATION_COMPLETE, payload: newLocation});
    expect(store.getState().locationStore.locations.indexOf(newLocation) > -1).toBe(true);

});
