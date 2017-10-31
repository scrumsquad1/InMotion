import React, {Component} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

class GoogleMaps extends Component {

    render() {
        return <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: 47.585224, lng: -122.148861 }}
        />
    }

}

export default withScriptjs(withGoogleMap(GoogleMaps));