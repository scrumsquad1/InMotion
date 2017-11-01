import _ from 'lodash';
import states from '../../_Resources/states';
import {TYPE_AUTH_FETCHUSERDATA_COMPLETE, TYPE_AUTH_FETCHUSERDATA_ERROR, TYPE_AUTH_FETCHUSERDATA_START} from '../actions/auth/action_FetchUserData';
import {TYPE_AUTH_SIGNIN_COMPLETE, TYPE_AUTH_SIGNIN_ERROR, TYPE_AUTH_SIGNIN_START} from '../actions/auth/action_SignIn';
import {TYPE_AUTH_SIGNOUT_COMPLETE, TYPE_AUTH_SIGNOUT_ERROR, TYPE_AUTH_SIGNOUT_START} from '../actions/auth/action_SignOut';
import {TYPE_AUTH_SIGNUP_COMPLETE, TYPE_AUTH_SIGNUP_ERROR, TYPE_AUTH_SIGNUP_START} from '../actions/auth/action_SignUp';

const DEFAULT_STATE = {
    fetchUserDataState: states.UNINITIALIZED,
    fetchUserDataError: null,
    userData: null,
    signinState: states.UNINITIALIZED,
    signinError: null,
    signoutState: states.UNINITIALIZED,
    signoutError: null,
    signupState: states.UNINITIALIZED,
    singupError: null

};

/**
 * Reducer for UserStore
 *
 * See ./reducer_Navigation for details about reducers
 * See ./reducer_Lists for example of async setup
 */
export default (previousState = DEFAULT_STATE, action) => {

    let stateChange = {};

    switch (action.type) {

        case TYPE_AUTH_FETCHUSERDATA_START: {
            break;
        }
        case TYPE_AUTH_FETCHUSERDATA_COMPLETE: {
            break;
        }
        case TYPE_AUTH_FETCHUSERDATA_ERROR: {
            break;
        }
        case TYPE_AUTH_SIGNIN_START: {
            break;
        }
        case TYPE_AUTH_SIGNIN_COMPLETE: {
            break;
        }
        case TYPE_AUTH_SIGNIN_ERROR: {
            break;
        }
        case TYPE_AUTH_SIGNOUT_START: {
            break;
        }
        case TYPE_AUTH_SIGNOUT_COMPLETE: {
            break;
        }
        case TYPE_AUTH_SIGNOUT_ERROR: {
            break;
        }
        case TYPE_AUTH_SIGNUP_START: {
            break;
        }
        case TYPE_AUTH_SIGNUP_COMPLETE: {
            break;
        }
        case TYPE_AUTH_SIGNUP_ERROR: {
            break;
        }

    }

    return {..._.cloneDeep(previousState), ...stateChange};

}
