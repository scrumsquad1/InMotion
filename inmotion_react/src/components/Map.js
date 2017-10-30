import React, {Component} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

class GoogleMaps extends Component {

    render() {
        return <GoogleMap/>
    }

}

export default withScriptjs(withGoogleMap(GoogleMaps));