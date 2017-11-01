export const TYPE_NAVIGATION_REDIRECT = 'type_navigation_redirect';

/**
 * Dispatching this action with the requested path (i.e. /login), will change the application page to /login.
 *
 * How this works is that the state will have a variable called requestedPath
 * When requestedPath is not equal to null, code in /index.js will set the current route to the requestedPath using history.push(requestedPath)
 * After, it will set requestedPath to null again.
 *
 * Again remember how we will often have to override react functions to ensure that there is no setState. This is my way of gaining complete control over react-router.
 *
 * @param requestedPath The path you would like to change the page to.
 */
export default (requestedPath) => (dispatch) => {
    dispatch({type: TYPE_NAVIGATION_REDIRECT, payload: requestedPath});
}