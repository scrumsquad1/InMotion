import React, {Component} from 'react';
import {connect} from 'react-redux';

import action_SetListState from '../../_redux/actions/maps/action_SetListState';
import action_DeleteList from '../../_redux/actions/lists/action_DeleteList';
import thunkBindActionCreators from '../../_redux/thunkBindActionCreators';
import action_InsertTask from '../../_redux/actions/tasks/action_InsertTask';
import action_EditTask from '../../_redux/actions/tasks/action_EditTask';
import action_DeleteTask from '../../_redux/actions/tasks/action_DeleteTask';
import Task from '../../data/Task';
import _ from 'lodash';

class ListOverlay extends Component {

    render() {

        const {list, listState} = this.props;
        const {deleteList, setListState, insertTask, editTask, deleteTask} = this.props;

        let header = (
            <div className="panel-heading clearfix">
                <h3 className="panel-title pull-left" style={{paddingTop: 10}}>{list.name}</h3>
                <button className="btn btn-warning pull-right" onClick={() => {
                    setListState({id: list.id, state: 'deleteList'});
                }}>X
                </button>
            </div>
        );

        let body = (
            <div>
                {list.tasks.map(task =>
                    <a className="list-group-item btn">{task.name}</a>
                )}
            </div>
        );

        let footer = null;

        switch (listState) {

            case 'visible': {
                body = (
                    <div>
                        {list.tasks.map(task =>
                            <a onClick={() => {
                                setListState({id: list.id, state: 'editTask_' + task.id});
                            }} className="list-group-item btn">{task.subject}</a>
                        )}
                        <button className="btn btn-primary form-control" onClick={() => {
                            setListState({id: list.id, state: 'addTask'});
                        }}>Add Task
                        </button>
                    </div>
                );
                break;
            }
            case 'addTask': {
                body = (
                    <div>
                        {list.tasks.map(task =>
                            <a className="list-group-item btn">{task.subject}</a>
                        )}
                        <div>
                            <input className="form-control" placeholder="Subject" autoFocus={true} onKeyDown={(e) => {
                                switch (e.key) {
                                    case 'Enter': {
                                        const newTask = new Task({
                                            list,
                                            subject: e.target.value
                                        });
                                        insertTask(newTask);
                                        setListState({id: list.id, state: 'visible'});
                                        break;
                                    }
                                    case 'Escape': {
                                        setListState({id: list.id, state: 'visible'});
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            }}/>
                            <button className="form-control btn btn-primary" onClick={() => {
                                setListState({id: list.id, state: 'visible'});
                            }}>Cancel
                            </button>
                        </div>
                    </div>
                );
                break;
            }
            case 'deleteList': {
                header = (
                    <div className="panel-heading"><h3 className="panel-title">Confirm</h3></div>
                );
                body = (
                    <div>
                        <button className="list-group-item btn" onClick={() => {
                            deleteList(list);
                        }}>Delete List
                        </button>
                        <button className="list-group-item btn" onClick={() => {
                            setListState({id: list.id, state: 'visible'});
                        }}>Cancel
                        </button>
                    </div>
                );
                break;
            }
            default: {

                if (listState.indexOf('editTask') > -1) {

                    const taskID = parseInt(listState.split('_')[1]);

                    let task;
                    for (let i in list.tasks) {
                        let currTask = list.tasks[i];
                        if (currTask.id === taskID) {
                            task = currTask;
                            break;
                        }
                    }

                    body = (
                        <div>
                            {list.tasks.map(task => {
                                if (task.id !== taskID) {
                                    return <a className="list-group-item btn">{task.subject}</a>;
                                } else {
                                    return <input className="form-control" placeholder={task.subject} autoFocus={true} onKeyDown={(e) => {
                                        switch (e.key) {
                                            case 'Enter': {
                                                const taskClone = _.cloneDeep(task);
                                                taskClone.subject = e.target.value;
                                                editTask(taskClone);
                                                setListState({id: list.id, state: 'visible'});
                                                break;
                                            }
                                            case 'Escape': {
                                                setListState({id: list.id, state: 'visible'});
                                                break;
                                            }
                                            default: {
                                                break;
                                            }
                                        }
                                    }}/>;
                                }
                            })}
                        </div>
                    );
                }

                break;

            }

        }

        return <div className="panel panel-default" style={{width: 200}}>
            {header}
            {body}
            {footer && <div className="panel-footer">{footer}</div>}
        </div>;

    }

}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return thunkBindActionCreators({
        deleteList: action_DeleteList,
        setListState: action_SetListState,
        insertTask: action_InsertTask,
        editTask: action_EditTask,
        deleteTask: action_DeleteTask
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOverlay);
