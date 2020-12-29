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
    // function updateSliderSetting(event) {
    //     const selected = event.target.querySelector(
    //         "#hoora-carousel-loop-setting option:checked"
    //     );
    //     setAttributes({ loop: selected.value });
    //     event.preventDefault();
    // }
    // function updateSliderSetting(value) {
    //     setAttributes(value);
    // }
	const handleAddItem = () => {
        const items = [ ...attributes.items ];
        items.push( {
            title: '', desc:'',  image:{id:'', url:'' , thumbnailUrl:'', alt:'', caption:''
         }
        } );
        setAttributes( { items } );
    };

    const handleRemoveItem = ( index ) => {
    	const items = [ ...attributes.items ];
    	items.splice( index, 1 );
    	setAttributes( { items } );
    };

    const onChaneTitle = ( title, index ) => {
        const items = [ ...attributes.items ];
        items[ index ].title = title;
        setAttributes( { items } );
    };
    const onChangeDesc = ( desc, index ) => {
        const items = [ ...attributes.items ];
        items[ index ].desc = desc;
        setAttributes( { items } );
    };
    const onSelectImage = (selectedImage,index) => {
        const items = [ ...attributes.items ];
        items[ index ].image = {
            id: selectedImage.id,
            url: selectedImage.sizes.full.url,
            thumbnailUrl: selectedImage.sizes.thumbnail.url,
            alt: selectedImage.alt,
            caption: selectedImage.caption
        }
        setAttributes( { items } );
    };
    const getImageButton = (openEvent, image) => {
        if(image.url) {
            return <img src = { image.thumbnailUrl } onClick={ openEvent } className="image"/>
        }
        else {
            return (
                <div className="button-container">
                    <Button onClick={ openEvent } className="button button-large">
                        { __( 'Select an image' ) }
                    </Button>
                </div>
            );
        }
    }; 

    let itemFields,
        itemDisplay,
        settings;

    if ( attributes.items.length ) {
        itemFields = attributes.items.map( ( item, index ) => {
            return(
            <Fragment key={ index }>

                <TextControl
                    className="swiper-title"
                    placeholder="Swiper title"
                    value={ attributes.items[ index ].title }
                    onChange={ ( title ) => onChaneTitle( title, index ) }
                />
                <TextControl
                    className="swiper-desc"
                    placeholder="Swiper description"
                    value={ attributes.items[ index ].desc }
                    onChange={ ( desc ) => onChangeDesc( desc, index ) }
                />
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={ (image) => onSelectImage(image,index) }
                        allowedTypes={ ['image'] }
                        // allowedTypes={ ALLOWED_MEDIA_TYPES }
                        value={ attributes.items[ index ].image.id }
                        render={({ open }) => getImageButton(open,attributes.items[ index ].image) }
                    />
                </MediaUploadCheck>
                <IconButton
                    className="remove-item"
                    icon="no-alt"
                    label="Delete item"
                    onClick={ () => handleRemoveItem( index ) }
                />
            </Fragment>
            )
        } );

        itemDisplay = attributes.items.map( ( item, index ) => {
            return <div key={ index }><p>{ item.title }</p> <p>{ item.desc }</p><img src={item.image.thumbnailUrl}/></div>;
        } );
        // settings = 
    }
	return [
        <InspectorControls key="3">
            <PanelBody title={__("Swiper Settings")}>
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
            <PanelBody title={ __( 'Items' ) }>
                { itemFields }
                <div>
                    <Button
                        isDefault
                        onClick={ handleAddItem.bind( this ) }
                    >
                        { __( 'Add New Item' ) }
                    </Button>
                </div>
            </PanelBody>
        </div>,
        // <div key="2" className={ className }>
        //     <h2>Swiper</h2>
        //     { itemDisplay }
        // </div>,
    ];
}
