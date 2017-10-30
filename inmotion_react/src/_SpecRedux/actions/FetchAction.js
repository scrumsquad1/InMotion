import BaseAction from './BaseAction';
import {states} from '../index';

const START_POSTFIX = '_START';
const COMPLETE_POSTFIX = '_COMPLETE';

export default class FetchAction extends BaseAction {

    constructor() {
        super();

        this.stateField = `${this.displayName}State`;
        this.defaultFields[this.stateField] = states.UNINITIALIZED;

        this.actionTypeStart = this.actionType + START_POSTFIX;
        this.actionTypeComplete = this.actionType + COMPLETE_POSTFIX;
    }

    dispatchStart(dispatch, payload) {
        dispatch({type: this.actionType + START_POSTFIX, payload: payload});
    }

    dispatchComplete(dispatch, payload) {
        dispatch({type: this.actionType + COMPLETE_POSTFIX, payload: payload});
    }

    onStart(state, payload) {

    }

    onComplete(state, payload) {

    }

    onError(state, payload) {

    }

    reducer(state, action) {

        let stateChange = super.reducer(state, action);

        switch (action.type) {
            case this.actionTypeStart:
                stateChange[this.stateField] = state.LOADING;
                stateChange[this.errorField] = null;
                stateChange = {...stateChange, ...this.onStart(stateChange, action.payload)};
                break;
            case this.actionTypeComplete:
                stateChange[this.stateField] = state.COMPLETE;
                stateChange = {...stateChange, ...this.onComplete(stateChange, action.payload)};
                break;
            case this.actionTypeError:
                stateChange[this.stateField] = state.ERROR;
                stateChange = {...stateChange, ...this.onError(stateChange, action.payload)};
                break;
            default:
                break;
        }

        return stateChange;

    }


}