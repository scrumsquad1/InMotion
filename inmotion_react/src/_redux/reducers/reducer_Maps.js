import {TYPE_MAPS_SHOWITEM} from '../actions/maps/action_ShowItem';
import {TYPE_MAPS_HIDEITEM} from '../actions/maps/action_HideItem';
import _ from 'lodash';

const DEFAULT_STATE = {
    visibleItemId: null
};

/**
 * Reducer for MapsStore
 *
 * See ./reducer_Navigation for details about reducers
 *
 */
export default (previousState = DEFAULT_STATE, action) => {

    let stateChange = {};

    switch (action.type) {
        case TYPE_MAPS_SHOWITEM: {
            stateChange.visibleItemId = action.payload;
            break;
        }
        case TYPE_MAPS_HIDEITEM: {
            stateChange.visibleItemId = null;
            break;
        }
        default: {
            break;
        }
    }

    return {..._.cloneDeep(previousState), ...stateChange};

}