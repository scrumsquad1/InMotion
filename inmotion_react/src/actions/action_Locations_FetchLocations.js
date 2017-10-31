import {FetchAction} from '../_SpecRedux';
import {LOCATIONS} from '../_Resources/dummyList';

class ActionFetchLocations extends FetchAction {

    get storeName() {
        return 'locations';
    }

    get displayName() {
        return 'fetchLocations';
    }

    getDefaultFields() {
        return {
            locations: LOCATIONS
        };
    }

    onComplete(state, payload) {
        return super.onComplete(state, payload);
    }

    reducer(state, action) {
        return {};
    }

}

export default new ActionFetchLocations();