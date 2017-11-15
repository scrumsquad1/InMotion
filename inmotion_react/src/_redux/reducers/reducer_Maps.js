import _ from 'lodash';
import {TYPE_MAPS_HIDEMENUS} from '../actions/maps/action_HideMenus';
import {TYPE_MAPS_SHOWMENU} from '../actions/maps/action_ShowMenu';
import {TYPE_MAPS_SETMENULOCATION} from '../actions/maps/action_SetMenuLocation';
import {TYPE_MAPS_SETLISTSTATE} from '../actions/maps/action_SetListState';

const DEFAULT_STATE = {
    visibleMenu: null,
    menuLocation: null,
    listStates: []
};

/**
 * Reducer for MapsStore
 *
 * See ./reducer_Navigation for details about reducers
 *
 */
export default (previousState = DEFAULT_STATE, action) => {

    let newState = _.cloneDeep(previousState);

    switch (action.type) {
        case TYPE_MAPS_SHOWMENU: {
            newState.visibleMenu = action.payload;
            break;
        }
        case TYPE_MAPS_SETMENULOCATION: {
            newState.menuLocation = action.payload;
            break;
        }
        case TYPE_MAPS_HIDEMENUS: {
            newState.visibleMenu = null;
            newState.menuLocation = null;
            break;
        }
        case TYPE_MAPS_SETLISTSTATE: {
            newState.listStates[action.payload.id] = action.payload.state;
            break;
        }
        default: {
            break;
        }
    }

    return newState;

}