import React, {Component} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs, OverlayView} from 'react-google-maps';
import {connect} from 'react-redux'
import TodoList from './TodoList'
import ListItem from './ListItem';
import fakeJoin from '../_Resources/dummyList';

class GoogleMaps extends Component {

    generateOverlays() {

        const lists = this.props.lists.lists;
        const locations = this.props.locations.locations;

        lists.map(li => {
            console.log(fakeJoin({
                listItem: li,
                locations: locations
            }));
        });

        // return lists.map((li) => (
        //
        //     console.log(li)
        //
        {/*<OverlayView*/
        }
        // position={{lat: 47.585224, lng: -122.148861}}
        // mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        // >
        {/*<TodoList listId={0}/>*/
        }
        // </OverlayView>
        // ));

    }

    render() {
        return (
            <GoogleMap defaultZoom={16} defaultCenter={{lat: 47.585224, lng: -122.148861}}>
                {this.generateOverlays()}
            </GoogleMap>
        )
    }

}

export default connect(({maps, lists, locations}) => ({maps, lists, locations}))(withScriptjs(withGoogleMap(GoogleMaps)));