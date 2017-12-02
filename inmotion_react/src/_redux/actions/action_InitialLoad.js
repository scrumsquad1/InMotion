import {GET_LOCATIONS} from "../../_SpecFetcher/_routes/locations";
import {GET_LISTS} from "../../_SpecFetcher/_routes/lists";
import {GET_TASKS} from "../../_SpecFetcher/_routes/tasks";
import Location from '../../data/Location';
import Task from '../../data/Task';
import List from '../../data/List';
import {TYPE_MAPS_SETLISTSTATE} from "./maps/action_SetListState";
import action_SetListState from "./maps/action_SetListState";

export const TYPE_LISTS_FETCHLISTS_START = 'type_lists_fetchlists_start';
export const TYPE_LISTS_FETCHLISTS_COMPLETE = 'type_lists_fetchlists_complete';
export const TYPE_LISTS_FETCHLISTS_ERROR = 'type_lists_fetchlists_error';

export const TYPE_LOCATIONS_FETCHLOCATIONS_START = 'type_locations_fetchlocations_start';
export const TYPE_LOCATIONS_FETCHLOCATIONS_COMPLETE = 'type_locations_fetchlocations_complete';
export const TYPE_LOCATIONS_FETCHLOCATIONS_ERROR = 'type_locations_fetchlocations_error';

export const TYPE_TASKS_FETCHTASKS_START = 'type_tasks_fetchtasks_start';
export const TYPE_TASKS_FETCHTASKS_COMPLETE = 'type_tasks_fetchtasks_complete';
export const TYPE_TASKS_FETCHTASKS_ERROR = 'type_tasks_fetchtasks_error';


// Callback horror
export default () => (dispatch) => {

    let locationData;
    let listsData;
    let tasksData;

    function convertToObjects() {
        if (locationData && listsData && tasksData) {

            const locations = [];
            locationData.forEach(({id, lat, lng}) => {
                locations[id] = new Location({id, lat, lng})
            });
            dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_COMPLETE, payload: locations});

            const lists = [];
            listsData.map(({id, name, location_id}) => {
                const newList = new List({id, name});
                newList.location = locations[location_id];
                lists[id] = newList;
                dispatch(action_SetListState({id: id, state: 'visible'}));
            });

            const tasks = [];
            tasksData.map(({id, subject, priority, list_id}) => {
                const newTask = new Task({id, subject, priority});
                newTask.list = lists[list_id];
                tasks[id] = newTask;
                lists[list_id].tasks.push(newTask);
            });

            dispatch({type: TYPE_TASKS_FETCHTASKS_COMPLETE});
            dispatch({type: TYPE_LISTS_FETCHLISTS_COMPLETE, payload: lists});

        }

    }

    dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_START});
    GET_LOCATIONS((err, result) => {
        if (err) {
            dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_ERROR, payload: err});
        } else {
            locationData = JSON.parse(result.text);
            convertToObjects();
        }
    });

    dispatch({type: TYPE_LISTS_FETCHLISTS_START});
    GET_LISTS((err, result) => {
        if (err) {
            dispatch({type: TYPE_LISTS_FETCHLISTS_ERROR, payload: err});
        } else {
            listsData = JSON.parse(result.text);
            convertToObjects();
        }
    });

    dispatch({type: TYPE_TASKS_FETCHTASKS_START});
    GET_TASKS((err, result) => {
        if (err) {
            dispatch({type: TYPE_TASKS_FETCHTASKS_ERROR});
        } else {
            tasksData = JSON.parse(result.text);
            convertToObjects();
        }
    });

};

