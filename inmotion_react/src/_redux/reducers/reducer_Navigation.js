import {TYPE_NAVIGATION_PATHCHANGE} from '../actions/navigation/action_PathChange';
import {TYPE_NAVIGATION_REDIRECT} from '../actions/navigation/action_Redirect';
import _ from 'lodash';

const DEFAULT_STATE = {
    path: '/',
    redirectPath: null
};

/**
 * Reducer for NavigationStore
 *
 * @param previousState The previous state. If there is no previous state (on startup) then create it with default values
 * @param action Any action that has been dispatched. All actions, by standard practice, will look like {type:'actiontype',payload:'any data you want to pass, can be an object'}
 *
 * The reducer will return the new state of the store it handles.
 *
 */
export default (previousState = DEFAULT_STATE, // If state is null, state will be set as DEFAULT_STATE. This is shorthand for if(state == null) {state=DEFAULT_STATE}
                action // Reducers are run every time an action is dispatched. This is the action that triggered the update. By standard practice, will look like {type:'actiontype',payload:'any data you want to pass, can be an object'}
) => {

    let newState = _.cloneDeep(previousState); // Remember the previousState MUST NEVER BE CHANGED, that is considered mutation and is bad practice. Instead we will track the differences and create a new object with the differences added.

    switch (action.type) {
        case TYPE_NAVIGATION_PATHCHANGE: {
            newState.path = action.payload;
            newState.redirectPath = null; // If the path is changed, cancel any pending redirects
            break;
        }
        case TYPE_NAVIGATION_REDIRECT: {
            newState.redirectPath = action.payload; // Assigning this variable to a path will cause the application to change pages. Once the page changes, TYPE_NAVIGATION_PATHCHANGE will be dispatched and the code above will be run. See /index.js
            break;
        }
        default: {
            break;
        }
    }

    return newState; // Now overwrite properties of the clonedPreviousState with the changes we made

}