import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {Panel} from 'react-bootstrap';

class TodoList extends Component {

    static propTypes = {
        listId: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]).isRequired
    };

    constructor({lists, listId}) {
        super();
        this.listId = listId;
        this.list = lists.lists[listId];
    }

    generateListBody() {
        return this.list.map((li) => <p>{li.title}</p>)
    }

    render() {
        return <Panel header={this.listId}>
            {this.generateListBody()}
        </Panel>
    }

}

export default connect(({lists}) => ({lists}))(TodoList)