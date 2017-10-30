import {FetchAction} from '../_SpecRedux/index';

class ActionSignOut extends FetchAction {

    get storeName() {
        return 'user';
    }

    get displayName() {
        return 'logout';
    }

    getDefaultFields() {
        return {
            userSignedIn: false
        };
    }

    onComplete(state, payload) {
        return {
            userSignedIn: false
        }
    }

    onExecute(dispatch, args) {
        this.dispatchStart(dispatch);
        // fetcher.clearAuthentication();
        this.dispatchComplete(dispatch);
    }

}

export default ActionSignOut;
