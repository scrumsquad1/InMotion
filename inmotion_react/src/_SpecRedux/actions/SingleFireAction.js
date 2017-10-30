import BaseAction from './BaseAction';

export default class SingleFireAction extends BaseAction {

    reducer(state, action) {

        let stateChange = super.reducer(state, action);

        if (action.type === this.actionType)
            stateChange = {...stateChange, ...this.onReceive(state, action.payload)};

        return stateChange;

    }

    dispatchAction(dispatch, payload) {
        dispatch({type: this.actionType, payload});
    }

    onReceive(state, payload) {

    }

}