import React, {Component} from 'react';
import {connect} from 'react-redux';
import OverlayPanelListElement from './OverlayPanelListElement';
import action_ShowMenu from '../../_redux/actions/maps/action_ShowMenu';
import action_HideMenus from '../../_redux/actions/maps/action_HideMenus';

class OverlayPanelMenu extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.name}</div>
                {this.props.children}
                {this.props.parentMenu && <OverlayPanelListElement name="Back" onClick={() => {
                    this.props.dispatch(action_ShowMenu(this.props.parentMenu))
                }}/>}
                {this.props.showCancel && <OverlayPanelListElement name="Cancel" onClick={() => {
                    this.props.dispatch(action_HideMenus())
                }}/>}
            </div>
        )
    }
}

export default connect(({}) => ({}))(OverlayPanelMenu);