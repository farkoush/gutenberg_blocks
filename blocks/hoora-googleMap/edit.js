/**
 * Internal block libraries
 */
const { Component, Fragment } = wp.element;
const { TextControl, PanelBody,RangeControl, Button } = wp.components;
const { InspectorControls, 	MediaUpload, MediaUploadCheck } = wp.blockEditor;
import Map from './map'

export default class Edit extends Component {
    
    // constructor() {
    //     super( ...arguments );
    //     this.state = {
    //         googleMapsLoaded: false,
    //     };
    // }
    
    render() {
        const onSelectImage = img => {
            const image = {
                ID : img.id,
                URL: img.url,
                ALT: img.alt,
            }
            setAttributes( { image } );
            console.log(image);
        };
        const onRemoveImage = () => {
            const image = {
                ID: 0,
                ULR: '',
                ALT:'',
            }
            setAttributes({image});
        };
		const getImageButton = (openEvent) => {
			if(attributes.image.URL) {
				return (
					<img
						src={ attributes.image.URL }
						onClick={ openEvent }
						className="image"
					/>
				);
			}
			else {
				return (
					<div className="button-container">
						<Button
							onClick={ openEvent }
							className="button button-large"
						>
							Pick an image
						</Button>
					</div>
				);
			}
		}; 
        const { attributes, className, setAttributes, isSelected } = this.props;
        // console.log('zoom' + attributes.zoom)
        return[(
            // isSelected && (
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
                    <PanelBody>
                            <div className={className}>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={ onSelectImage }
                                        allowedTypes={ ['image'] }
                                        // allowedTypes={ ALLOWED_MEDIA_TYPES }
                                        value={ attributes.image.id }
                                        render={({ open }) => getImageButton(open) }
                                    />
                                </MediaUploadCheck>
                                { !! attributes.image.ID &&
                                <MediaUploadCheck>
                                    <Button onClick={ onRemoveImage }>
                                    X                                    
                                    </Button>
                                </MediaUploadCheck>
                                }
                            </div>
                    </PanelBody>
                </InspectorControls>
            // ),
        ),
            <Map
                id="myMap"
                height = {attributes.height}
                options={{
                center: { lat: attributes.lat, lng: attributes.lng },
                zoom: parseInt(attributes.zoom,10)
                }}
                onMapLoad={ map => {
                    console.log(attributes.zoom)
                var marker = new window.google.maps.Marker({
                    // position: { lat: 41.0082, lng: 28.9784 },
                    position: {  lat: attributes.lat, lng: attributes.lng },
                    map: map,
                    icon: attributes.image.URL,
                    // title: 'Hello Istanbul!'
                });
                }}
            />
        ]

      }
}
