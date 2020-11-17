/**
 * Internal block libraries
 */
const { Component } = wp.element;
const { TextControl, PanelBody,RangeControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
import Map2 from './map'

export default class Edit extends Component {
    
    // constructor() {
    //     super( ...arguments );
    //     this.state = {
    //         googleMapsLoaded: false,
    //     };
    // }
    
    render() {
        const { attributes, className, setAttributes, isSelected } = this.props;
        console.log('zoom' + attributes.zoom)
        return[
            isSelected && (
                <InspectorControls>
                    <PanelBody>
                        <TextControl
                            label= 'lat' 
                            value={ attributes.lat }
                            onChange={ lat => setAttributes( { lat } ) }
                        />
                    </PanelBody>
                    <PanelBody>
                        <TextControl
                            label= 'lng'
                            value= { attributes.lng }
                            onChange={ lng => setAttributes( { lng } ) }
                        />
                    </PanelBody>
                    
                    <PanelBody>
                        <RangeControl
                            beforeIcon="arrow-left-alt2"
                            afterIcon="arrow-right-alt2"
                            label= 'zoom'
                            value={ attributes.zoom }
                            onChange={ zoom => setAttributes( { zoom } ) }
                            min={ 1 }
                            max={ 21 }
                        />
                    </PanelBody>

                    <PanelBody>
                        <RangeControl
                            beforeIcon="arrow-left-alt2"
                            afterIcon="arrow-right-alt2"
                            label= 'height'
                            value={ attributes.height }
                            onChange={ height => setAttributes( { height } ) }
                            min={ 50 }
                            max={ 1000 }
                        />
                    </PanelBody>
                </InspectorControls>
            ),
            <Map2
                id="myMap"
                options={{
                center: { lat: attributes.lat, lng: attributes.lng },
                zoom: parseInt(attributes.zoom,10)
                }}
                onMapLoad={ map => {
                var marker = new window.google.maps.Marker({
                    // position: { lat: 41.0082, lng: 28.9784 },
                    position: {  lat: attributes.lat, lng: attributes.lng },
                    map: map,
                    title: 'Hello Istanbul!'
                });
                }}
            />
        ]

      }
}
