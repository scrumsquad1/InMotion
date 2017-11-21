import {INSERT_TASK} from '../../../_SpecFetcher/_routes/tasks';

export const TYPE_TASKS_INSERTTASK_START = 'type_tasks_inserttask_start';
export const TYPE_TASKS_INSERTTASK_COMPLETE = 'type_tasks_inserttask_complete';
export const TYPE_TASKS_INSERTTASK_ERROR = 'type_tasks_inserttask_error';


export default (task) => (dispatch) => {

    if (task) {

        dispatch({type: TYPE_TASKS_INSERTTASK_START});
        INSERT_TASK(task, (err, result) => {
            if (err) {
                dispatch({type: TYPE_TASKS_INSERTTASK_ERROR, payload: err});
            } else {
                task.id = JSON.parse(result.text).id;
                dispatch({type: TYPE_TASKS_INSERTTASK_COMPLETE, payload: task});
            }
        });

    }

}