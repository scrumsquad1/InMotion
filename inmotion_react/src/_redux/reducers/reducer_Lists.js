import _ from 'lodash';
import {TYPE_LISTS_FETCHLISTS_COMPLETE, TYPE_LISTS_FETCHLISTS_ERROR, TYPE_LISTS_FETCHLISTS_START} from '../actions/lists/action_FetchLists';
import states from '../../_Resources/status'
import {LISTS} from '../../_Resources/dummyList';
import {TYPE_LISTS_INSERTLISTS_COMPLETE, TYPE_LISTS_INSERTLISTS_ERROR, TYPE_LISTS_INSERTLISTS_START} from "../actions/lists/action_InsertList";
import {TYPE_LISTS_DELTELISTS_COMPLETE, TYPE_LISTS_DELTELISTS_ERROR, TYPE_LISTS_DELTELISTS_START} from "../actions/lists/action_DeleteList";

const DEFAULT_STATE = {
    fetchListsState: states.UNINITIALIZED,
    fetchListsError: null,
    insertListState: states.UNINITIALIZED,
    insertListError: null,
    deleteListState: states.UNINITIALIZED,
    deleteListError: null,
    lists: LISTS
};

export default (previousState = DEFAULT_STATE, action) => {

    let stateChange = {};

    switch (action.type) {
        case TYPE_LISTS_FETCHLISTS_START: {
            stateChange.fetchListsState = states.LOADING;
            stateChange.fetchListsError = null;
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
        case TYPE_LISTS_INSERTLISTS_START: {
            stateChange.insertListState = states.LOADING;
            stateChange.insertListError = null;
            break;
        }
        case TYPE_LISTS_INSERTLISTS_COMPLETE: {
            stateChange.insertListState = states.COMPLETE;
            // TODO insert list locally
            break;
        }
        case TYPE_LISTS_INSERTLISTS_ERROR: {
            stateChange.insertListState = states.ERROR;
            stateChange.insertListError = action.payload;
            break;
        }
        case TYPE_LISTS_DELTELISTS_START: {
            stateChange.deleteListState = states.LOADING;
            stateChange.deleteListError = null;
            break;
        }
        case TYPE_LISTS_DELTELISTS_COMPLETE: {
            stateChange.deleteListState = states.COMPLETE;
            // TODO delete list from lists locally
            break;
        }
        case TYPE_LISTS_DELTELISTS_ERROR: {
            stateChange.deleteListState = states.ERROR;
            stateChange.deleteListError = action.payload;
            break;
        }
        default: {
            break;
        }
    }

    return {..._.cloneDeep(previousState), ...stateChange};

}