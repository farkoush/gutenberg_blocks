/**
 * Internal block libraries
 */
const { Component } = wp.element;
import Map from './map'

export default class Save extends Component {
    
    // constructor() {
    //     super( ...arguments );
    //     this.state = {
    //         googleMapsLoaded: false,
    //     };
    // }
    
    render() {
        const { attributes, className } = this.props;
        console.log('zoom' + attributes.zoom)
        return(
            <Map
                id="myMapp"
                options={{
                center: { lat: attributes.lat, lng: attributes.lng },
                zoom: parseInt(attributes.zoom,10)
                }}
                onMapLoad={ map => {
                    console.log('map::' + map);
                var marker = new window.google.maps.Marker({
                    // position: { lat: 41.0082, lng: 28.9784 },
                    position: {  lat: attributes.lat, lng: attributes.lng },
                    map: map,
                    title: 'Hello Istanbul!'
                });
                }}
            />
        )

      }
}
