/**
 * Internal block libraries
 */
const { Component } = wp.element;
const { TextControl, PanelBody,RangeControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
import Map from './Map'

export default class Edit extends Component {
    
    constructor() {
        super( ...arguments );
        this.state = {
            googleMapsLoaded: false,
        };
    }
    
    render() {
        const { attributes, className, setAttributes, isSelected } = this.props;
        return[
            isSelected && (
                <InspectorControls>
                    <PanelBody>
                        <TextControl
                            label= 'Google Map Block' 
                            value={ attributes.text }
                            onChange={ text => setAttributes( { text } ) }
                        />
                    </PanelBody>
                    <PanelBody>
                        <TextControl
                            label= 'address '
                            value= { attributes.address }
                            onChange={ address => setAttributes( { address } ) }
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
            <Map
                id="myMap"
                options={{
                center: { lat: 41.0082, lng: 28.9784 },
                zoom: 8
                }}
                onMapLoad={ map => {
                var marker = new window.google.maps.Marker({
                    position: { lat: 41.0082, lng: 28.9784 },
                    map: map,
                    title: 'Hello Istanbul!'
                });
                }}
            />
        ]

      }
}
