import React from 'react';
import {getStore} from './utils';

import diff from 'deep-diff-object';
import _ from 'lodash';

import Location from '../data/Location';
import {TYPE_LOCATIONS_INSERTLOCATION_COMPLETE} from '../_redux/actions/locations/action_InsertLocation';

it('action_InsertLocation works as expected', () => {

    const store = getStore();

    const newLocation = new Location({id: -100, lat: 123, lng: -123});

    const start = _.cloneDeep(store.getState());
    expect(start.locationStore.locations.length).toBe(0);

    store.dispatch({type: TYPE_LOCATIONS_INSERTLOCATION_COMPLETE, payload: newLocation});

    const end = store.getState();
    expect(end.locationStore.locations.length).toBe(1);




});
