import ExpectedProperty from '../_SpecRedux/ExpectedProperty';
import {FetchAction} from '../_SpecRedux/index';

class ActionSignUp extends FetchAction {

    get storeName() {
        return 'user';
    }

    get displayName() {
        return 'signup';
    }

    getDefaultFields() {
    }

    onComplete(state, payload) {
    }

    get expectedArguments() {
        return [
            new ExpectedProperty({
                name: 'username',
                type: 'string'
            }),
            new ExpectedProperty({
                name: 'password',
                type: 'string'
            })
        ];
    }

    onExecute(dispatch, {username, password}) {

    }

}

export default ActionSignUp;