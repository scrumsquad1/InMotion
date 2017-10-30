import React, {Component} from 'react';
import {connect} from 'react-redux';
import GoogleMaps from './Map'

class Home extends Component {

    render() {
        return <GoogleMaps
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    }

}

export default connect(() => {
    return {}
})(Home)