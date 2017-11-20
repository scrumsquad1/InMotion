import {GET_LOCATIONS} from "../../_SpecFetcher/_routes/locations";
import {GET_LISTS} from "../../_SpecFetcher/_routes/lists";
import {GET_TASKS} from "../../_SpecFetcher/_routes/tasks";
import Location from '../../data/Location';
import Task from '../../data/Task';
import List from '../../data/List';

export const TYPE_INITIALLOAD_START = 'type_initialload_start';
export const TYPE_INITIALLOAD_COMPLETE = 'type_initialload_complete';
export const TYPE_INITIALLOAD_ERROR = 'type_initialload_error';

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

    dispatch({type: TYPE_INITIALLOAD_START});

    dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_START});
    GET_LOCATIONS((err, result) => {

        if (err) {
            dispatch({type: TYPE_INITIALLOAD_ERROR});
            dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_ERROR, payload: err});
        } else {

            const getLocationsResult = JSON.parse(result.text);
            // dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_COMPLETE});

            dispatch({type: TYPE_LISTS_FETCHLISTS_START});
            GET_LISTS((err, result) => {

                if (err) {
                    dispatch({type: TYPE_INITIALLOAD_ERROR});
                    dispatch({type: TYPE_LISTS_FETCHLISTS_ERROR, payload: err});
                } else {

                    const getListsResult = JSON.parse(result.text);
                    // dispatch({type: TYPE_LISTS_FETCHLISTS_COMPLETE});

                    dispatch({type: TYPE_TASKS_FETCHTASKS_START});
                    GET_TASKS((err, result) => {

                        if (err) {
                            dispatch({type: TYPE_INITIALLOAD_ERROR});
                            dispatch({type: TYPE_TASKS_FETCHTASKS_ERROR});
                        } else {

                            const getTasksResult = JSON.parse(result.text);
                            // dispatch({type: TYPE_TASKS_FETCHTASKS_COMPLETE});

                            const locations = [];
                            getLocationsResult.forEach(({id, lat, lng}) => {
                                locations[id] = new Location({id, lat, lng})
                            });

                            const lists = [];
                            getListsResult.map(({id, name, location_id}) => {
                                const newList = new List({id, name});
                                newList.location = locations[location_id];
                                lists[id] = newList;
                            });

                            const tasks = [];
                            getTasksResult.map(({id, subject, list_id, priority}) => {
                                const newTask = new Task({id, subject, priority});
                                newTask.list = lists[list_id];
                                tasks[id] = newTask;
                                lists[list_id].tasks.push(newTask);
                            });
                            console.log(tasks);

                        }

                    });

                }

            });

        }

    });


};

