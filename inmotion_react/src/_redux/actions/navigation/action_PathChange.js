export const TYPE_NAVIGATION_PATHCHANGE = 'type_navigation_pathchange';

/**
 * Dispatching this action with the new path will update the state to say where the user currently is (i.e. /login)
 *
 * Most likely this will be called through code in /index.js because that is where we are setting up the react-router. This should be automatic.
 * We will use the currentPath variable when saving the users's state so when the user comes back to our website we can return them to the page they were last viewing.
 *
 * @param newPath The new path the user has navigated to
 */
export default (newPath) => (dispatch) => {
    dispatch({type: TYPE_NAVIGATION_PATHCHANGE, payload: newPath});
}