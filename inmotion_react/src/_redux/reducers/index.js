import combineReducers from 'redux/es/combineReducers';

import reducer_Auth from './reducer_Auth';
import reducer_Lists from './reducer_Lists';
import reducer_Maps from './reducer_Maps';
import reducer_Navigation from './reducer_Navigation';

/**
 * Combine reducers into the main 'Store' for the Provider in /index.js to use
 */
export default combineReducers({
    authStore: reducer_Auth,
    listsStore: reducer_Lists,
    mapStore: reducer_Maps,
    navigationStore: reducer_Navigation
});