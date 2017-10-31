import {SingleFireAction} from '../_SpecRedux';

class ActionShowItem extends SingleFireAction {

    get storeName() {
        return 'maps';
    }

    get displayName() {
        return 'showItem';
    }

    getDefaultFields() {
        return {
            visibleItem: null
        }
    }

    get singleArgumentType() {
        return 'string';
    }

    onReceive(state, listItemId) {
        return {
            visibleItem: listItemId
        }
    }

    onExecute(dispatch, listItemId) {
        this.dispatchAction(dispatch, listItemId)
    }

}

export default new ActionShowItem();

