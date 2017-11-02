import _ from 'lodash';
import {TYPE_LISTS_FETCHLISTS_COMPLETE, TYPE_LISTS_FETCHLISTS_ERROR, TYPE_LISTS_FETCHLISTS_START} from '../actions/lists/action_FetchLists';
import states from '../../_Resources/status'
import {LISTS} from '../../_Resources/dummyList';

const DEFAULT_STATE = {
    fetchListsState: states.UNINITIALIZED,
    fetchListsError: null,
    // listData: null
    lists: LISTS
};

/**
 * Reducer for ListsStore
 *
 * See ./reducer_Navigation for details about reducers
 */
export default (previousState = DEFAULT_STATE, action) => {

    let stateChange = {};

    switch (action.type) {
        case TYPE_LISTS_FETCHLISTS_START: {
            stateChange.fetchListsState = states.LOADING;
            stateChange.fetchListsError = null; // Clear the error if the user is trying again
            break;
        }
        case TYPE_LISTS_FETCHLISTS_COMPLETE: {
            stateChange.fetchListsState = states.COMPLETE;
            stateChange.lists = action.payload;
            break;
        }
        case TYPE_LISTS_FETCHLISTS_ERROR: {
            stateChange.fetchListsState = states.ERROR;
            stateChange.fetchListsError = action.payload;
            break;
        }
        default: {
            break;
        }
    }

    return {..._.cloneDeep(previousState), ...stateChange};

}