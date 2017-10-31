import {GET_AUTH} from '../_SpecFetcher/_routes/auth';
import {FetchAction} from '../_SpecRedux/index';

class ActionFetchUserData extends FetchAction {

    get storeName() {
        return 'user';
    }

    get displayName() {
        return 'fetchUserData';
    }

    getDefaultFields() {
        return {
            userData: {
                username: 'Connor'
            }
        };
    }

    onComplete(state, payload) {
        return {
            userData: payload
        };
    }

    onExecute(dispatch, args) {
        GET_AUTH((err, getAuthResponse) => {

            let {hasError, user} = getAuthResponse;

            if (!hasError) {
                this.dispatchComplete(dispatch, user);
            } else {
                throw new Error('No user data delivered');
            }

        });
    }

}

export default new ActionFetchUserData();
