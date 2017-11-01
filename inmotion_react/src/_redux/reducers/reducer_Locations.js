import {LOCATIONS} from '../../_Resources/dummyList';
import _ from 'lodash';

const DEFAULT_VALUES = {
    locations: LOCATIONS
};

/**
 * Reducer for UserStore
 *
 * See ./reducer_Navigation for details about reducers
 */
export default (previousState = DEFAULT_VALUES, action) => {

    let stateChange = {};

    switch (action.type) {
        default: {
            break;
        }
    }

    return {..._.cloneDeep(previousState), ...stateChange};

}