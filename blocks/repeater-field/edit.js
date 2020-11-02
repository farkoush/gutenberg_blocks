import "./editor.scss";
const {
	__,
} = wp.i18n;
const {
	Button,
    PanelBody,
    IconButton,
	TextControl,
} = wp.components;

const {
    MediaUpload,
	MediaPlaceholder,
	MediaUploadCheck,
	InspectorControls,
} = wp.blockEditor;
const {
	Fragment,
} = wp.element;


export default function Edit({ attributes, setAttributes, className }) {
	const handleAddLocation = () => {
        const locations = [ ...attributes.locations ];
        locations.push( {
            address: '', city:'',  image:{id:'', url:'' , thumbnailUrl:'', alt:'', caption:'' }
        } );
        setAttributes( { locations } );
    };

    const handleRemoveLocation = ( index ) => {
    	const locations = [ ...attributes.locations ];
    	locations.splice( index, 1 );
    	setAttributes( { locations } );
    };

    const handleLocationChange = ( address, index ) => {
        const locations = [ ...attributes.locations ];
        locations[ index ].address = address;
        setAttributes( { locations } );
    };
    const handleLocationChangeCity = ( city, index ) => {
        const locations = [ ...attributes.locations ];
        locations[ index ].city = city;
        setAttributes( { locations } );
    };
    const onSelectImage1 = (selectedImage,index) => {
        const locations = [ ...attributes.locations ];
        console.log(selectedImage.sizes.thumbnail.url)
        locations[ index ].image = {
            id: selectedImage.id,
            url: selectedImage.sizes.full.url,
            thumbnailUrl: selectedImage.sizes.thumbnail.url,
            alt: selectedImage.alt,
            caption: selectedImage.caption
        }
        setAttributes( { locations } );
    };
    const getImageButton = (openEvent, image) => {
        if(image.url) {
            return (
                <img
                    src = { image.thumbnailUrl }
                    // src={ image.sizes.thumbnail.url }
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

    let locationFields,
        locationDisplay;

    if ( attributes.locations.length ) {
        locationFields = attributes.locations.map( ( location, index ) => {
            return(
            <Fragment key={ index }>
                <TextControl
                    className="grf__location-address"
                    placeholder="350 Fifth Avenue New York NY"
                    value={ attributes.locations[ index ].address }
                    onChange={ ( address ) => handleLocationChange( address, index ) }
                />
                <TextControl
                    className="grf__location-address"
                    placeholder="350 Fifth Avenue New York NY"
                    value={ attributes.locations[ index ].city }
                    onChange={ ( city ) => handleLocationChangeCity( city, index ) }
                />
                <MediaUploadCheck>
                        <MediaUpload
                            onSelect={ (image) => onSelectImage1(image,index) }
                            allowedTypes={ ['image'] }
                            // allowedTypes={ ALLOWED_MEDIA_TYPES }
                            value={ attributes.locations[ index ].image.id }
                            render={({ open }) => getImageButton(open,attributes.locations[ index ].image) }
                        />
                </MediaUploadCheck>
                <IconButton
                    className="grf__remove-location-address"
                    icon="no-alt"
                    label="Delete location"
                    onClick={ () => handleRemoveLocation( index ) }
                />
            </Fragment>
            )
        } );

        locationDisplay = attributes.locations.map( ( location, index ) => {
            return <div key={ index }><p>{ location.address }</p> <p>{ location.city }</p><img src={location.image.thumbnailUrl}/></div>;
        } );
    }
	return [
        // <InspectorControls key="1">
        <div key="1">
            <PanelBody title={ __( 'Locations' ) }>
                { locationFields }
                <Button
                    isDefault
                    onClick={ handleAddLocation.bind( this ) }
                >
                    { __( 'Add Location' ) }
                </Button>
            </PanelBody>
        </div>,
        <div key="2" className={ className }>
            <h2>Repeater Field</h2>
            { locationDisplay }
        </div>,
    ];
}
