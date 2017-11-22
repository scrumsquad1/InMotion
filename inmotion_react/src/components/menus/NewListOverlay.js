import React, {Component} from 'react';
import {connect} from 'react-redux';
import OverlayPanelMenu from './OverlayPanelMenu';
import List from '../../data/List';
import Location from '../../data/Location';
import action_InsertList from '../../_redux/actions/lists/action_InsertList';
import action_HideMenus from '../../_redux/actions/maps/action_HideMenus';

class NewListOverlay extends Component {

    render() {
        return <OverlayPanelMenu name="NewList" parentMenu="main" showCancel={true}>
            <form>
                <input className="form-control" type="text" placeholder="Name" ref="list_name"/>
            </form>
            <button className="btn btn-warning form-control" onClick={() => {

                const newList = new List({
                    name: this.refs.list_name.value,
                    location: new Location({
                        lat: this.props.mapStore.menuLocation.lat,
                        lng: this.props.mapStore.menuLocation.lng,
                    })
                });

                this.props.dispatch(action_InsertList(newList));
                this.props.dispatch(action_HideMenus());

            }}> Submit
            </button>
        </OverlayPanelMenu>
    }

}

export default connect(({mapStore}) => ({mapStore}))(NewListOverlay);