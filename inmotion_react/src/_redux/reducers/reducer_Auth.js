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

    let newState = _.cloneDeep(previousState);

    switch (action.type) {

        case TYPE_AUTH_FETCHUSERDATA_START: {
            newState.fetchUserDataStatus = status.LOADING;
            newState.fetchUserDataError = null;
            break;
        }
        case TYPE_AUTH_FETCHUSERDATA_COMPLETE: {
            newState.fetchUserDataStatus = status.COMPLETE;
            newState.userData = action.payload;
            break;
        }
        case TYPE_AUTH_FETCHUSERDATA_ERROR: {
            newState.fetchUserDataStatus = status.ERROR;
            newState.fetchUserDataError = action.payload;
            break;
        }
        case TYPE_AUTH_SIGNIN_START: {
            newState.signinStatus = status.LOADING;
            newState.signinError = null;
            break;
        }
        case TYPE_AUTH_SIGNIN_COMPLETE: {
            newState.signinStatus = status.COMPLETE;
            break;
        }
        case TYPE_AUTH_SIGNIN_ERROR: {
            newState.signinStatus = status.ERROR;
            newState.signinError = action.payload;
            break;
        }
        case TYPE_AUTH_SIGNOUT_START: {
            newState.signoutStatus = status.LOADING;
            newState.signoutError = null;
            break;
        }
        case TYPE_AUTH_SIGNOUT_COMPLETE: {
            newState.signoutStatus = status.COMPLETE;
            break;
        }
        case TYPE_AUTH_SIGNOUT_ERROR: {
            newState.signoutStatus = status.ERROR;
            newState.signoutError = action.payload;
            break;
        }
        case TYPE_AUTH_SIGNUP_START: {
            newState.signupStatus = status.LOADING;
            newState.signupError = null;
            break;
        }
        case TYPE_AUTH_SIGNUP_COMPLETE: {
            newState.signupStatus = status.COMPLETE;
            break;
        }
        case TYPE_AUTH_SIGNUP_ERROR: {
            newState.signupStatus = status.ERROR;
            newState.signupError = action.payload;
            break;
        }
        default: {
            break;
        }

    }

    return newState;

}
