import {SingleFireAction} from '../_SpecRedux';

class ActionHideItem extends SingleFireAction {

    get storeName() {
        return 'maps';
    }

    get displayName() {
        return 'hideItem';
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
            visibleItem: null
        }
    }

    onExecute(dispatch, listItemId) {
        this.dispatchAction(dispatch, listItemId)
    }

}

export default new ActionHideItem();
