import {GET_LISTS} from '../../../_SpecFetcher/_routes/lists';

export const TYPE_LISTS_FETCHLISTS_START = 'type_lists_fetchlists_start';
export const TYPE_LISTS_FETCHLISTS_COMPLETE = 'type_lists_fetchlists_complete';
export const TYPE_LISTS_FETCHLISTS_ERROR = 'type_lists_fetchlists_error';

//                      VVV This is what Thunk does.
export default () => (dispatch) => {

    // Using this I can dispatch 'Hey, we are about to start fetching data from a server'
    dispatch({type: TYPE_LISTS_FETCHLISTS_START});

    // Make a server call. (This may take awhile, who knows. It would be bad if the page freezes while we wait for a response, so we do it in the background)
    GET_LISTS((err, result) => {

        // We got a response from the server!

        if (!err) {
            // Everything looks good, we we will dispatch COMPLETE with the result as the payload.
            dispatch({type: TYPE_LISTS_FETCHLISTS_COMPLETE, payload: result});
        } else {
            // Something went wrong, so we will dispatch ERROR with the error as the payload.
            dispatch({type: TYPE_LISTS_FETCHLISTS_ERROR, payload: err});
        }

    });

}

/**
 * Before thunk you would really only be able to dispatch({type: 'something', payload: 'something'});
 * Or if you want to do some processing, you could make a function that took arguments and created a dispatch object from the arguments like

 * function createDispatchObject(name) {
 *
 *      return {type:CHANGE_NAME,payload:name);
 *
 * }
 *
 * dispatch(createDispatchObject('connor'));
 *
 * But how would we make a server call?
 *
 * function getNameFromServer() {
 *
 *      let out = null;
 *
 *      GET_NAME((err, result) => {
 *
 *          return result.name ??? This wouldn't work because the return belongs to the (err, result) function.
 *
 *          out = result.name ??? This also would not work because after the program calls GET_NAME, it keeps moving on. So it would blow past this before a response comes in and createDispatchObject would return null.
 *
 *      });
 *
 *      return out
 *
 * }
 *
 * // The solution is to have dispatch from within the action
 *
 * function getNameFromServer(dispatch) <-- will be passed automatically when dispatch(getNameFromServer) is called {
 *
 *      GET_NAME((err, result) => {
 *
 *          dispatch({type: COMPLETE, payload: result.name}); <--- Perfect
 *
 *      });
 *
 * }
 *
 * So what if you still want arguments, you ask? Easy! since dispatch, if passed a function like above, gives the function a 'dispatch' as a argument
 * You create a function that accepts arguments, and make it return a function that then accepts dispatch as an argument
 *
 *  function getNameFromServerById(id) {
 *
 *      return function(dispatch) {
 *
 *          GET_NAME(id, (err, result) => {
 *
 *              dispatch({type: COMPLETE, payload: result.name}); <--- Perfect
 *
 *          });
 *
 *      }
 *
 *  }
 *
 *  so
 *
 *  getNameFromServerById(10) returns (dispatch) => { GET_NAME(10, (err, result) => { I have dispatch!!! } }.
 *
 *  Or, for shorthand
 *
 *  export default (id) => (dispatch) => {
 *
 *
 *  }
 *
 *  So to use an action, import it and do dispatch(action_Something(args));
 *
 *  Or if you dont want args, still do () => (dispatch) => {}
 *
 *  That way we dont have to remember which actions we need to call with dispatch(action()) vs dispatch(action)
 *
 */

