import _ from 'lodash';
import status from '../../_Resources/status';
import {TYPE_LOCATIONS_FETCHLOCATIONS_COMPLETE, TYPE_LOCATIONS_FETCHLOCATIONS_ERROR, TYPE_LOCATIONS_FETCHLOCATIONS_START} from '../actions/locations/action_FetchLocations';
import {TYPE_LOCATIONS_DELETELOCATION_COMPLETE, TYPE_LOCATIONS_DELETELOCATION_ERROR, TYPE_LOCATIONS_DELETELOCATION_START} from '../actions/locations/action_DeleteLocation';
import {TYPE_LOCATIONS_INSERTLOCATION_COMPLETE, TYPE_LOCATIONS_INSERTLOCATION_ERROR, TYPE_LOCATIONS_INSERTLOCATION_START} from '../actions/locations/action_InsertLocation';
import {TYPE_LOCATIONS_EDITLOCATIONS_COMPLETE, TYPE_LOCATIONS_EDITLOCATIONS_ERROR, TYPE_LOCATIONS_EDITLOCATIONS_START} from '../actions/locations/action_EditLocation';

const DEFAULT_VALUES = {
    fetchLocationStatus: status.UNINITIALIZED,
    fetchLocationsError: null,
    insertLocationStatus: status.UNINITIALIZED,
    insertLocationError: null,
    editLocationStatus: status.UNINITIALIZED,
    editLocationError: null,
    deleteLocationStatus: status.UNINITIALIZED,
    deleteLocationError: null,
    locations: null
};

function insertLocation(state, location) {
    //TODO stub
    return state;
}

function editLocation(state, location) {
    //TODO stub
    return state;
}

function deleteLocation(state, location) {
    //TODO stub
    return state;
}

/**
 * Reducer for UserStore
 *
 * See ./reducer_Navigation for details about reducers
 */
export default (previousState = DEFAULT_VALUES, action) => {

    let newState = _.cloneDeep(previousState);

    switch (action.type) {

        /**
         * FetchLocations
         */
        case TYPE_LOCATIONS_FETCHLOCATIONS_START: {
            newState.fetchLocationStatus = status.LOADING;
            newState.fetchLocationsError = null;
            break;
        }
        case TYPE_LOCATIONS_FETCHLOCATIONS_COMPLETE: {
            newState.fetchLocationStatus = status.COMPLETE;
            break;
        }
        case TYPE_LOCATIONS_FETCHLOCATIONS_ERROR: {
            newState.fetchLocationStatus = status.ERROR;
            newState.fetchLocationsError = action.payload;
            break;
        }

        /**
         * InsertLocation
         */
        case TYPE_LOCATIONS_INSERTLOCATION_START: {
            newState.insertLocationStatus = status.LOADING;
            newState.insertLocationError = null;
            break;
        }
        case TYPE_LOCATIONS_INSERTLOCATION_COMPLETE: {
            newState.insertLocationStatus = status.COMPLETE;
            insertLocation(newState, action.payload);
            break;
        }
        case TYPE_LOCATIONS_INSERTLOCATION_ERROR: {
            newState.insertLocationStatus = status.ERROR;
            newState.insertLocationError = action.payload;
            break;
        }

        /**
         * EditLocation
         */
        case TYPE_LOCATIONS_EDITLOCATIONS_START: {
            newState.editLocationStatus = status.LOADING;
            newState.editLocationError = null;
            break;
        }
        case TYPE_LOCATIONS_EDITLOCATIONS_COMPLETE: {
            newState.editLocationStatus = status.COMPLETE;
            editLocation(newState, action.payload);
            break;
        }
        case TYPE_LOCATIONS_EDITLOCATIONS_ERROR: {
            newState.editLocationStatus = status.ERROR;
            newState.editLocationError = action.payload;
            break;
        }

        /**
         * DeleteLocation
         */
        case TYPE_LOCATIONS_DELETELOCATION_START: {
            newState.deleteLocationStatus = status.LOADING;
            newState.deleteLocationError = null;
            break;
        }
        case TYPE_LOCATIONS_DELETELOCATION_COMPLETE: {
            newState.deleteLocationStatus = status.COMPLETE;
            deleteLocation(newState, action.payload);
            break;
        }
        case TYPE_LOCATIONS_DELETELOCATION_ERROR: {
            newState.deleteLocationStatus = status.ERROR;
            newState.deleteLocationError = action.payload;
            break;
        }

        default: {
            break;
        }
    }

    return newState;


}