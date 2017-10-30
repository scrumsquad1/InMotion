import {FetchAction} from '../_SpecRedux/index';
import ExpectedProperty from '../_SpecRedux/ExpectedProperty';

// import action_FetchUserData from './../action_FetchUserData';

class ActionSignIn extends FetchAction {

    get storeName() {
        return 'user';
    }

    get displayName() {
        return 'login';
    }

    getDefaultFields() {
        return {
            userSignedIn: false
        };
    }

    onComplete(state, payload) {
        return {
            userSignedIn: true
        };
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

        // this.dispatchStart(dispatch);
        //
        // fetcher.setAuthentication({username, password}); // Set authentication
        // dispatch(action_FetchUserData.action(({err, dispatch}) => { // Verify authentication using fetchUserData
        //
        //     if (err)
        //         throw new Error(err);
        //
        //     this.dispatchComplete(dispatch);
        //
        // })());

    }

}

export default ActionSignIn;