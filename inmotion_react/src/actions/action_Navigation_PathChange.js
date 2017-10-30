import {SingleFireAction} from '../_SpecRedux/index';

class ActionPathChange extends SingleFireAction {

    get storeName() {
        return 'navigation';
    }

    get displayName() {
        return 'pathChange';
    }

    getDefaultFields() {
        return {
            path: '/',
            redirectPath: null
        };
    }

    onReceive(state, payload) {
        return {
            path: payload,
            redirectPath: null
        }
    }

    get singleArgumentType() {
        return 'string';
    }

    onExecute(dispatch, path) {
        this.dispatchAction(dispatch, path);
    }

}

export default ActionPathChange;