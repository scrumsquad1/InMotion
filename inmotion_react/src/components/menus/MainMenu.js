import React, {Component} from 'react';
import {connect} from 'react-redux';
import OverlayPanelList from '../OverlayPanelMenu';
import OverlayPanelListElement from '../OverlayPanelListElement';
import action_ShowMenu from '../../_redux/actions/maps/action_ShowMenu';

class MainMenu extends Component {

    render() {
        return <OverlayPanelList name="Menu" showCancel={true}>
            <OverlayPanelListElement name="New List" onClick={() => {
                this.props.dispatch(action_ShowMenu('newList'));
            }}/>
        </OverlayPanelList>
    }

}

export default connect(({}) => ({}))(MainMenu);