import reducer_User from './redcuer_User';
import reducer_Lists from './reducer_Lists';
import reducer_Maps from './reducer_Maps';
import reducer_Navigation from './reducer_Navigation';
import reducer_Locations from './reducer_Locations';

/**
 * Combine reducers into the main 'Store' for the Provider in /index.js to use
 */
export default combineReducers({
    userStore: reducer_User,
    listsStore: reducer_Lists,
    locationsStore: reducer_Locations,
    mapsStore: reducer_Maps,
    navigationStore: reducer_Navigation
});