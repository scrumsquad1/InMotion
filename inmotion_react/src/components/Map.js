import React, {Component} from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';
import {connect} from 'react-redux'
import fakeJoin from '../_Resources/dummyList';

/**
 * How we use redux in a Component
 */

class Map extends Component { // Create a normal component

    // Never use setState(). setState is dead to us.

    generateOverlays() {

        // Look at the bottom before looking at what I am doing here

        const lists = this.props.listsStore.lists;
        const locations = this.props.locationsStore.locations;

        lists.map(li => {
            console.log(fakeJoin({
                listItem: li,
                locations: locations
            }));
        });

    }

    render() {
        return (
            <GoogleMap defaultZoom={16} defaultCenter={{lat: 47.585224, lng: -122.148861}}>
                {this.generateOverlays()}
            </GoogleMap>
        )
    }

}


// Now instead of just exporting the component, we are going to use 'connect' from redux.
// This will allow us to access the stores we created in the reducers as props. But we must first tell redux what stores we want to use.
function assignStateToProps(state) { // State is referring to the massive json file I was talking about that controls the whole project

    // We will return an object with what stores we want to use like this:
    return {
        mapsStore: state.mapsStore, // Can now be accessed in the component with this.props.mapsStore
        listsStore: state.listsStore, // Can now be accessed in the component with this.props.listsStore
        locationsStore: state.locationsStore // Can now be accessed in the component with this.props.locationsStore
    }

}

let wrappedMap = withScriptjs(withGoogleMap(Map)); // This is needed for GoogleMaps and is not standard, ignore.
export default connect(assignStateToProps)(wrappedMap) // Pretend wrappedMap is the Map component

// I personally like to make the assignStateToProps part inline
// export default connect((state) => {
//    return {
//        ...blah
//    }
// })(Map);

// If your () => { return blah } function returns something immediately, you can cut out the return part by wrapping the second part in (). For example
// export default connect((state) => ({
//      mapsStore: state.mapsStore
//      listsStore: state.listsStore
//      locationsStore: state.locationsStore
// }))(Map)

// Even better, observe the following
// function test({a, b}) { <--- extracting properties from within the constructor using {}
//     console.log(a);
//     console.log(b);
// }
// test({
//     a: 10,
//     b: 20
// });
// Outputs a and b.

// We can do the same with state, if I know I want the mapsStore, listsStore, locationStore I can do
// export default connect(({mapsStore, listsStore, locationsStore}) => (
//     {
//         mapsStore: mapsStore,
//         listsStore: listsStore,
//         locationsStore: locationsStore
//     }
// ));

// Great, but that seems redundant since I am typing the names twice. For shorthand I can do
// export default connect(({mapsStore, listsStore, locationsStore}) => (
//     {
//         mapsStore, (equivalent of mapsStore: mapsStore)
//         listsStore,
//         locationsStore
//     }
// ));

// Finally!!!
// export default connect(({mapsStore, listsStore, locationsStore}) => ({mapsStore, listsStore, locationStore})(Maps);