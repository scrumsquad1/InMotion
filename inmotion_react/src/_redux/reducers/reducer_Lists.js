import _ from 'lodash';
import status from '../../_Resources/status'
import {TYPE_LISTS_FETCHLISTS_COMPLETE, TYPE_LISTS_FETCHLISTS_ERROR, TYPE_LISTS_FETCHLISTS_START} from '../actions/action_InitialLoad';
import {TYPE_LISTS_INSERTLIST_COMPLETE, TYPE_LISTS_INSERTLIST_ERROR, TYPE_LISTS_INSERTLIST_START} from '../actions/lists/action_InsertList';
import {TYPE_LISTS_DELETELIST_COMPLETE, TYPE_LISTS_DELETELIST_ERROR, TYPE_LISTS_DELETELIST_START} from '../actions/lists/action_DeleteList';
import {TYPE_TASKS_INSERTTASK_COMPLETE, TYPE_TASKS_INSERTTASK_ERROR, TYPE_TASKS_INSERTTASK_START} from '../actions/tasks/action_InsertTask';
import {TYPE_TASKS_DELETETASK_COMPLETE, TYPE_TASKS_DELETETASK_ERROR, TYPE_TASKS_DELETETASK_START} from '../actions/tasks/action_DeleteTask';
import {TYPE_TASKS_EDITTASK_COMPLETE, TYPE_TASKS_EDITTASK_ERROR, TYPE_TASKS_EDITTASK_START} from '../actions/tasks/action_EditTask';

const DEFAULT_STATE = {
    fetchListStatus: status.UNINITIALIZED,
    fetchListsError: null,
    insertListStatus: status.UNINITIALIZED,
    insertListError: null,
    deleteListStatus: status.UNINITIALIZED,
    deleteListError: null,
    insertTaskStatus: status.UNINITIALIZED,
    insertTaskError: null,
    editTaskStatus: status.UNINITIALIZED,
    editTaskError: null,
    deleteTaskStatus: status.UNINITIALIZED,
    deleteTaskError: null,
    lists: []
};

function insertList(state, list) {
    state.lists.push(list);
}

function deleteList(state, list) {
    state.lists = state.lists.map(l => (l && l.id !== list.id) ? l : undefined);
}

function insertTask(state, task) {
    state.lists.forEach(l => {
        if (l && task.list.id === l.id) {
            l.tasks.push(task);
        }
    });
}

function editTask(state, task) {
    state.lists.forEach(l => {
        if (l && task.list.id === l.id) {
            l.tasks = l.tasks.map(t => t.id === task.id ? task : t);
        }
    });
}

function deleteTask(state, task) {
    state.lists.map(l => {
        if (l && task.list.id === l.id) {
            l.tasks = l.tasks.filter(t => {
                return t.id !== task.id;
            })
        }
    });
}

export default (previousState = DEFAULT_STATE, action) => {

    let newState = _.cloneDeep(previousState);

    switch (action.type) {

        /**
         * FetchLists
         */
        case TYPE_LISTS_FETCHLISTS_START: {
            newState.fetchListStatus = status.LOADING;
            newState.fetchListsError = null;
            break;
        }
        case TYPE_LISTS_FETCHLISTS_COMPLETE: {
            newState.fetchListStatus = status.COMPLETE;
            newState.lists = action.payload;
            break;
        }
        case TYPE_LISTS_FETCHLISTS_ERROR: {
            newState.fetchListStatus = status.ERROR;
            newState.fetchListsError = action.payload;
            break;
        }

        /**
         * InsertList
         */
        case TYPE_LISTS_INSERTLIST_START: {
            newState.insertListStatus = status.LOADING;
            newState.insertListError = null;
            break;
        }
        case TYPE_LISTS_INSERTLIST_COMPLETE: {
            newState.insertListStatus = status.COMPLETE;
            insertList(newState, action.payload);
            break;
        }
        case TYPE_LISTS_INSERTLIST_ERROR: {
            newState.insertListStatus = status.ERROR;
            newState.insertListError = action.payload;
            break;
        }

        /**
         * DeleteList
         */
        case TYPE_LISTS_DELETELIST_START: {
            newState.deleteListStatus = status.LOADING;
            newState.deleteListError = null;
            break;
        }
        case TYPE_LISTS_DELETELIST_COMPLETE: {
            newState.deleteListStatus = status.COMPLETE;
            deleteList(newState, action.payload);
            break;
        }
        case TYPE_LISTS_DELETELIST_ERROR: {
            newState.deleteListStatus = status.ERROR;
            newState.deleteListError = action.payload;
            break;
        }

        /**
         * InsertTask
         */
        case TYPE_TASKS_INSERTTASK_START: {
            newState.insertTaskStatus = status.LOADING;
            break;
        }
        case TYPE_TASKS_INSERTTASK_COMPLETE: {
            newState.insertTaskStatus = status.COMPLETE;
            insertTask(newState, action.payload);
            break;
        }
        case TYPE_TASKS_INSERTTASK_ERROR: {
            newState.insertTaskStatus = status.ERROR;
            newState.insertTaskError = action.payload;
            break;
        }

        /**
         * EditTask
         */
        case TYPE_TASKS_EDITTASK_START: {
            newState.editTaskStatus = status.LOADING;
            break;
        }
        case TYPE_TASKS_EDITTASK_COMPLETE: {
            newState.editTaskStatus = status.COMPLETE;
            editTask(newState, action.payload);
            break;
        }
        case TYPE_TASKS_EDITTASK_ERROR: {
            newState.editTaskStatus = status.ERROR;
            newState.editTaskError = action.payload;
            break;
        }

        /**
         * DeleteTask
         */
        case TYPE_TASKS_DELETETASK_START: {
            newState.deleteTaskStatus = status.LOADING;
            break;
        }
        case TYPE_TASKS_DELETETASK_COMPLETE: {
            newState.deleteTaskStatus = status.COMPLETE;
            deleteTask(newState, action.payload);
            break;
        }
        case TYPE_TASKS_DELETETASK_ERROR: {
            newState.deleteTaskStatus = status.ERROR;
            newState.deleteTaskError = action.payload;
            break;
        }

        default: {
            break;
        }

    }

    return newState;

}

