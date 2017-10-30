import {SingleFireAction} from '../_SpecRedux/index';

class ActionSetLoginVisible extends SingleFireAction {

    get storeName() {
        return 'navigation';
    }

    get displayName() {
        return 'setLoginVisible';
    }

    getDefaultFields() {
        return {
            loginOpen: false
        }
    }

    onReceive(state, payload) {
        return {
            loginOpen: payload
        };
    }

    get singleArgumentType() {
        return 'boolean';
    }

    onExecute(dispatch, open) {
        this.dispatchAction(dispatch, open);
    }

}

export default ActionSetLoginVisible;
