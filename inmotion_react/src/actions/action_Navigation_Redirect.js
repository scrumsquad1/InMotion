import {SingleFireAction} from '../_SpecRedux/index';

class ActionRedirect extends SingleFireAction {

    get storeName() {
        return 'navigation';
    }

    get displayName() {
        return 'redirect';
    }

    getDefaultFields() {
        return {
            redirectPath: null
        }
    }

    onReceive(state, payload) {
        return {
            redirectPath: payload
        };
    }

    get singleArgumentType() {
        return 'string';
    }

    onExecute(dispatch, path) {
        this.dispatchAction(dispatch, path);
    }

}

export default new ActionRedirect();