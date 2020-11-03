import "./editor.scss";
const {
	__,
} = wp.i18n;
const {
	Button,
    PanelBody,
    IconButton,
    TextControl,
    PanelRow,
    RadioControl,
    SelectControl,
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
    function updateSliderSetting(event) {
        const selected = event.target.querySelector(
            "#hoora-carousel-loop-setting option:checked"
        );
        setAttributes({ loop: selected.value });
        event.preventDefault();
    }
    function updateSliderSetting(value) {
        setAttributes(value);
    }
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
        locationDisplay,
        settings;

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
        // settings = 

    }
	return [
        // <InspectorControls key="1">
        // <InspectorControls key="3">
            <InspectorControls key="3">
					<PanelBody title={__("Carousel Settings")}>
						<PanelRow>
							<RadioControl
								label="Auto Play"
								selected={attributes.autoplay}
								options={[
									{ label: "True", value: "true" },
									{ label: "False", value: "false" }
								]}
								onChange={option => {
									updateSliderSetting({ autoplay: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Delay"
								value={attributes.delay}
								onChange={option => {
									updateSliderSetting({ delay: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Speed"
								value={attributes.speed}
								onChange={option => {
									updateSliderSetting({ speed: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<RadioControl
								label="Loop"
								selected={attributes.loop}
								options={[
									{ label: "True", value: "true" },
									{ label: "False", value: "false" }
								]}
								onChange={option => {
									updateSliderSetting({ loop: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="Effect"
								selected={attributes.effect}
								options={[
									{ label: "Slide", value: "slide" },
									{ label: "Fade", value: "fade" },
									{ label: "Cube", value: "cube" },
									{ label: "Coverflow", value: "coverflow" },
									{ label: "Flip", value: "flip" }
								]}
								onChange={option => {
									updateSliderSetting({ effect: option });
								}}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>,

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
        // <div key="2" className={ className }>
        //     <h2>Swiper</h2>
        //     { locationDisplay }
        // </div>,
    ];
}
