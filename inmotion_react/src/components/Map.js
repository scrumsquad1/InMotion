import React, {Component} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs, OverlayView} from 'react-google-maps';
import {connect} from 'react-redux'
import TodoList from './TodoList'
import ListItem from './ListItem';

class GoogleMaps extends Component {

    render() {
        return (
            <GoogleMap defaultZoom={16} defaultCenter={{lat: 47.585224, lng: -122.148861}}>
                <OverlayView
                    position={{lat: 47.585224, lng: -122.148861}}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <TodoList listId={'98075'}/>
                    <ListItem/>
                </OverlayView>
            </GoogleMap>
        )
    }

}

export default connect(({maps}) => ({maps}))(withScriptjs(withGoogleMap(GoogleMaps)));