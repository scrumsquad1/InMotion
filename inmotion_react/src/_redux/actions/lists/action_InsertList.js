import {INSERT_LIST} from '../../../_SpecFetcher/_routes/lists';
import {TYPE_MAPS_SETLISTSTATE} from '../maps/action_SetListState';
import {INSERT_LOCATION} from '../../../_SpecFetcher/_routes/locations';
import {TYPE_LOCATIONS_INSERTLOCATION_COMPLETE} from '../locations/action_InsertLocation';

export const TYPE_LISTS_INSERTLIST_START = 'type_lists_insertlist_start';
export const TYPE_LISTS_INSERTLIST_COMPLETE = 'type_lists_insertlist_complete';
export const TYPE_LISTS_INSERTLIST_ERROR = 'type_lists_insertlist_error';

export default (list) => (dispatch) => {

    dispatch({type: TYPE_LISTS_INSERTLIST_START});

    return new Promise((resolve, reject) => {

        function insertList() {
            INSERT_LIST(list, (err, result) => {
                if (err) {
                    dispatch({type: TYPE_LISTS_INSERTLIST_ERROR, payload: err});
                    reject(err);
                } else {
                    list.id = JSON.parse(result.text).id;
                    dispatch({type: TYPE_LISTS_INSERTLIST_COMPLETE, payload: list});
                    dispatch({type: TYPE_MAPS_SETLISTSTATE, payload: {id: list.id, state: 'visible'}});
                    resolve();
                }
            });
        }

        if (!list.location.id) {
            console.log('Location to be inserted');
            INSERT_LOCATION(list.location, (err, result) => {
                if (err) {
                    dispatch({type: TYPE_LISTS_INSERTLIST_ERROR, payload: err});
                    reject(err);
                } else {
                    list.location.id = JSON.parse(result.text).id;
                    dispatch({type: TYPE_LOCATIONS_INSERTLOCATION_COMPLETE, payload: list.location});
                    insertList();
                }
            });
        } else {
            insertList();
        }

    })

}