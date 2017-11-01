import _ from 'lodash';
import status from '../../_Resources/status';
import {TYPE_AUTH_FETCHUSERDATA_COMPLETE, TYPE_AUTH_FETCHUSERDATA_ERROR, TYPE_AUTH_FETCHUSERDATA_START} from '../actions/auth/action_FetchUserData';
import {TYPE_AUTH_SIGNIN_COMPLETE, TYPE_AUTH_SIGNIN_ERROR, TYPE_AUTH_SIGNIN_START} from '../actions/auth/action_SignIn';
import {TYPE_AUTH_SIGNOUT_COMPLETE, TYPE_AUTH_SIGNOUT_ERROR, TYPE_AUTH_SIGNOUT_START} from '../actions/auth/action_SignOut';
import {TYPE_AUTH_SIGNUP_COMPLETE, TYPE_AUTH_SIGNUP_ERROR, TYPE_AUTH_SIGNUP_START} from '../actions/auth/action_SignUp';

const DEFAULT_STATE = {
    fetchUserDataStatus: status.UNINITIALIZED,
    fetchUserDataError: null,
    userData: null,
    signinStatus: status.UNINITIALIZED,
    signinError: null,
    signoutStatus: status.UNINITIALIZED,
    signoutError: null,
    signupStatus: status.UNINITIALIZED,
    signupError: null

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
            stateChange.fetchUserDataStatus = status.LOADING;
            stateChange.fetchUserDataError = null;
            break;
        }
        case TYPE_AUTH_FETCHUSERDATA_COMPLETE: {
            stateChange.fetchUserDataStatus = status.COMPLETE;
            stateChange.userData = action.payload;
            break;
        }
        case TYPE_AUTH_FETCHUSERDATA_ERROR: {
            stateChange.fetchUserDataStatus = status.ERROR;
            stateChange.fetchUserDataError = action.payload;
            break;
        }
        case TYPE_AUTH_SIGNIN_START: {
            stateChange.signinStatus = status.LOADING;
            stateChange.signinError = null;
            break;
        }
        case TYPE_AUTH_SIGNIN_COMPLETE: {
            stateChange.signinStatus = status.COMPLETE;
            break;
        }
        case TYPE_AUTH_SIGNIN_ERROR: {
            stateChange.signinStatus = status.ERROR;
            stateChange.signinError = action.payload;
            break;
        }
        case TYPE_AUTH_SIGNOUT_START: {
            stateChange.signoutStatus = status.LOADING;
            stateChange.signoutError = null;
            break;
        }
        case TYPE_AUTH_SIGNOUT_COMPLETE: {
            stateChange.signoutStatus = status.COMPLETE;
            break;
        }
        case TYPE_AUTH_SIGNOUT_ERROR: {
            stateChange.signoutStatus = status.ERROR;
            stateChange.signoutError = action.payload;
            break;
        }
        case TYPE_AUTH_SIGNUP_START: {
            stateChange.signupStatus = status.LOADING;
            stateChange.signupError = null;
            break;
        }
        case TYPE_AUTH_SIGNUP_COMPLETE: {
            stateChange.signupStatus = status.COMPLETE;
            break;
        }
        case TYPE_AUTH_SIGNUP_ERROR: {
            stateChange.signupStatus = status.ERROR;
            stateChange.signupError = action.payload;
            break;
        }
        default: {
            break;
        }

    }

    return {..._.cloneDeep(previousState), ...stateChange};

}
