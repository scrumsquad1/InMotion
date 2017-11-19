import React, {Component} from 'react';
import {connect} from 'react-redux';
import Map from './Map'
import r from '../_Resources/r'

class Home extends Component {

    render() {
        return (
            <div>
                <Map
                    googleMapURL={r.keys.GOOGLE_MAPS}
                    containerElement={<div style={
                        {
                            position: 'absolute',
                            left: '0',
                            height: '95vh',
                            width: '100%'
                        }
                    }/>}
                    loadingElement={<div style={{height: `100%`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                />
            </div>
        )
    }

}

// See ./Maps.js for explanation
export default connect(() => ({}))(Home)