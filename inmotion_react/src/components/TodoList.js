import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import action_Maps_ShowItem from '../actions/action_Maps_ShowItem'

class TodoList extends Component {

    static propTypes = {
        listId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    };

    constructor({lists, listId}) {
        super();
        this.listId = listId;
        this.list = lists.lists[listId];
    }

    generateListBody() {
        return (
            <div className="list-group">
                {this.list.map((li) =>
                    <a onClick={() => {
                        this.props.dispatch(action_Maps_ShowItem.action(li.id))
                    }} href="#" key={li.id} className="list-group-item">{li.title}</a>
                )}
            </div>
        )
    }

    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                {this.listId}
            </div>
            {this.generateListBody()}
        </div>
    }

}

export default connect(({lists}) => ({lists}))(TodoList)