import {FetchAction} from '../_SpecRedux/index';
import dummyList from '../_Resources/dummyList'

class ActionFetchLists extends FetchAction {

    get storeName() {
        return 'lists'
    }

    get displayName() {
        return 'fetchLists';
    }

    getDefaultFields() {
        return {
            lists: dummyList
        };
    }

    onComplete(state, payload) {
        return super.onComplete(state, payload);
    }
}

export default ActionFetchLists;