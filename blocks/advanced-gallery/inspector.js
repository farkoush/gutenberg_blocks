 /**
 * External dependencies
 */
import classnames from 'classnames';
import every from 'lodash/every';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import debounce from 'lodash/debounce';
import Masonry from 'react-masonry-component';
// import ImageSizeControl from '../a/image-size-control'; //error when click on images
// import WebfontLoader from '../a/fontloader';
// import TypographyControls from '../a/typography-control';
// import MeasurementControls from '../a/measurement-control';
import KadenceColorOutput from '../a/kadence-color-output';
// import KadenceRange from '../a/components/range/range-control';
// import AdvancedPopColorControl from '../a/advanced-pop-color-control';
import Slider from 'react-slick';
const {
	applyFilters,
} = wp.hooks;
const { apiFetch } = wp;
/**
 * Import Icons
 */
import icons from '../a/icons';
/**
 * WordPress dependencies
 */
const { compose } = wp.compose;
const {
	IconButton,
	Button,
	ButtonGroup,
	PanelBody,
	Tooltip,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	TabPanel,
	Dashicon,
	withNotices,
} = wp.components;
const {
	BlockControls,
	BlockIcon,
	MediaPlaceholder,
	MediaUpload,
	InspectorControls,
} = wp.blockEditor;
const { Component, Fragment } = wp.element;
const { __, sprintf } = wp.i18n;
const { getBlobByURL, isBlobURL, revokeBlobURL } = wp.blob;
const { withSelect } = wp.data;

/**
 * Internal dependencies
 */
import GalleryImage from './gallery-image';
import icon from './icons';
import { pickRelevantMediaFiles, pickRelevantMediaFilesUpdate } from './shared';

/**
 * Import Css
 */
import './editor.scss';

const linkOptions = [
	{ value: 'attachment', label: __( 'Attachment Page', 'kadence-blocks' ) },
	{ value: 'media', label: __( 'Media File', 'kadence-blocks' ) },
	{ value: 'custom', label: __( 'Custom', 'kadence-blocks' ) },
	{ value: 'none', label: __( 'None', 'kadence-blocks' ) },
];
const typeOptions = [
	{ value: 'slider', label: __( 'Slider', 'kadence-blocks' ), icon: icons.galSlider, isDisabled: false },
	// { value: 'mosaic', label: __( 'Mosaic (Pro only)', 'kadence-blocks' ), icon: icons.galSlider, isDisabled: true },
];
 /**
  * Create an Inspector Controls wrapper Component
  */
 export default class Inspector extends Component {
   constructor() {
     super(...arguments);
   }
 
   render() {
     const { attributes, isSelected, className, noticeUI, setAttributes } = this.props;
     const { uniqueID, images, columns, linkTo, ids, columnControl, showCaption, captionStyles, lightbox, lightSize, type, imageRatio, captionStyle, gutter, thumbSize, autoPlay, autoSpeed, transSpeed, slidesScroll, arrowStyle, dotStyle, imageRadius, margin, marginUnit, displayShadow, shadow, shadowHover, carouselHeight, imageFilter, lightboxCaption, carouselAlign, thumbnailColumns, thumbnailControl, thumbnailRatio, mobileForceHover } = attributes;
     const galleryTypes = applyFilters( 'kadence.galleryTypes', typeOptions );
     const typeLabel = galleryTypes.filter( ( item ) => ( item.value === type ) );
     const columnControlTypes = [
        { key: 'linked', name: __( 'Linked', 'kadence-blocks' ), icon: __( 'Linked', 'kadence-blocks' ) },
        { key: 'individual', name: __( 'Individual', 'kadence-blocks' ), icon: __( 'Individual', 'kadence-blocks' ) },
    ];
    const onColumnChange = ( value ) => {
        let columnArray = [];
        if ( 1 === value ) {
            columnArray = [ 1, 1, 1, 1, 1, 1 ];
        } else if ( 2 === value ) {
            columnArray = [ 2, 2, 2, 2, 1, 1 ];
        } else if ( 3 === value ) {
            columnArray = [ 3, 3, 3, 2, 1, 1 ];
        } else if ( 4 === value ) {
            columnArray = [ 4, 4, 4, 3, 2, 2 ];
        } else if ( 5 === value ) {
            columnArray = [ 5, 5, 5, 4, 4, 3 ];
        } else if ( 6 === value ) {
            columnArray = [ 6, 6, 6, 4, 4, 3 ];
        } else if ( 7 === value ) {
            columnArray = [ 7, 7, 7, 5, 5, 4 ];
        } else if ( 8 === value ) {
            columnArray = [ 8, 8, 8, 6, 4, 4 ];
        }
        setAttributes( { columns: columnArray } );
    };
    const onThumbColumnChange = ( value ) => {
        let columnArray = [];
        if ( 1 === value ) {
            columnArray = [ 1, 1, 1, 1, 1, 1 ];
        } else if ( 2 === value ) {
            columnArray = [ 2, 2, 2, 2, 2, 2 ];
        } else if ( 3 === value ) {
            columnArray = [ 3, 3, 3, 3, 3, 3 ];
        } else if ( 4 === value ) {
            columnArray = [ 4, 4, 4, 4, 4, 4 ];
        } else if ( 5 === value ) {
            columnArray = [ 5, 5, 5, 4, 4, 4 ];
        } else if ( 6 === value ) {
            columnArray = [ 6, 6, 6, 4, 4, 4 ];
        } else if ( 7 === value ) {
            columnArray = [ 7, 7, 7, 5, 5, 4 ];
        } else if ( 8 === value ) {
            columnArray = [ 8, 8, 8, 6, 4, 4 ];
        } else if ( 9 === value ) {
            columnArray = [ 9, 9, 9, 7, 5, 5 ];
        } else if ( 10 === value ) {
            columnArray = [ 10, 10, 10, 8, 6, 6 ];
        }
        setAttributes( { thumbnailColumns: columnArray } );
    };
    const saveShadow = ( value ) => {
        const newUpdate = shadow.map( ( item, index ) => {
            if ( 0 === index ) {
                item = { ...item, ...value };
            }
            return item;
        } );
        setAttributes( {
            shadow: newUpdate,
        } );
    };
    const saveShadowHover = ( value ) => {
        const newUpdate = shadowHover.map( ( item, index ) => {
            if ( 0 === index ) {
                item = { ...item, ...value };
            }
            return item;
        } );
        setAttributes( {
            shadowHover: newUpdate,
        } );
    };
    const saveMargin = ( value ) => {
        const newUpdate = margin.map( ( item, index ) => {
            if ( 0 === index ) {
                item = { ...item, ...value };
            }
            return item;
        } );
        setAttributes( {
            margin: newUpdate,
        } );
    };
    const marginMin = ( marginUnit === 'em' || marginUnit === 'rem' ? -12 : -200 );
    const marginMax = ( marginUnit === 'em' || marginUnit === 'rem' ? 24 : 200 );
    const marginStep = ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 );
    const marginTypes = [
        { key: 'px', name: 'px' },
        { key: 'em', name: 'em' },
        { key: '%', name: '%' },
        { key: 'vh', name: 'vh' },
        { key: 'rem', name: 'rem' },
    ];
     return (
        <InspectorControls>
        <PanelBody title={ __( 'Gallery Settings', 'kadence-blocks' ) }>
            <h2>{ __( 'Gallery Type:' ) + ' ' + ( undefined !== typeLabel && undefined !== typeLabel[ 0 ] && typeLabel[ 0 ].label ? typeLabel[ 0 ].label : 'Masonry' ) }</h2>
            <ButtonGroup className="kt-style-btn-group kb-gallery-type-select" aria-label={ __( 'Gallery Type', 'kadence-blocks' ) }>
                { map( galleryTypes, ( { value, label, icon, isDisabled } ) => (
                    <Tooltip text={ label }>
                        <Button
                            key={ value }
                            className={ `kt-style-btn${ ( isDisabled ? ' kb-disabled-btn' : '' ) }` }
                            isSmall
                            isDisabled={ isDisabled }
                            isPrimary={ type === value }
                            aria-pressed={ type === value }
                            onClick={ () => {
                                if ( ! isDisabled ) {
                                    setAttributes( { type: value } );
                                }
                            } }
                        >
                            { icon }
                        </Button>
                    </Tooltip>
                ) ) }
            </ButtonGroup>
            { (  type === 'slider') && (
                <SelectControl
                    label={ __( 'Image ratio', 'kadence-blocks' ) }
                    options={ [
                        {
                            label: __( 'Landscape 4:3', 'kadence-blocks' ),
                            value: 'land43',
                        },
                        {
                            label: __( 'Landscape 3:2', 'kadence-blocks' ),
                            value: 'land32',
                        },
                        {
                            label: __( 'Landscape 2:1', 'kadence-blocks' ),
                            value: 'land21',
                        },
                        {
                            label: __( 'Landscape 3:1', 'kadence-blocks' ),
                            value: 'land31',
                        },
                        {
                            label: __( 'Landscape 4:1', 'kadence-blocks' ),
                            value: 'land41',
                        },
                        {
                            label: __( 'Portrait 3:4', 'kadence-blocks' ),
                            value: 'port34',
                        },
                        {
                            label: __( 'Portrait 2:3', 'kadence-blocks' ),
                            value: 'port23',
                        },
                        {
                            label: __( 'Square 1:1', 'kadence-blocks' ),
                            value: 'square',
                        },
                        {
                            label: __( 'Inherit', 'kadence-blocks' ),
                            value: 'inherit',
                        },
                    ] }
                    value={ imageRatio }
                    onChange={ ( value ) => setAttributes( { imageRatio: value } ) }
                />
            ) }
                <Fragment>
                    <h2 className="kt-heading-size-title">{ __( 'Gutter', 'kadence-blocks' ) }</h2>
                    <TabPanel className="kt-size-tabs"
                        activeClass="active-tab"
                        tabs={ [
                            {
                                name: 'desk',
                                title: <Dashicon icon="desktop" />,
                                className: 'kt-desk-tab',
                            },
                            {
                                name: 'tablet',
                                title: <Dashicon icon="tablet" />,
                                className: 'kt-tablet-tab',
                            },
                            {
                                name: 'mobile',
                                title: <Dashicon icon="smartphone" />,
                                className: 'kt-mobile-tab',
                            },
                        ] }>
                        {
                            ( tab ) => {
                                let tabout;
                                if ( tab.name ) {
                                    if ( 'mobile' === tab.name ) {
                                        tabout = (
                                            <RangeControl
                                                value={ ( ( undefined !== gutter && undefined !== gutter[ 2 ] ) ? gutter[ 2 ] : '' ) }
                                                onChange={ value => setAttributes( { gutter: [ ( ( undefined !== gutter && undefined !== gutter[ 0 ] ) ? gutter[ 0 ] : '' ), ( ( undefined !== gutter && undefined !== gutter[ 1 ] ) ? gutter[ 1 ] : '' ), value ] } ) }
                                                step={ 2 }
                                                min={ 0 }
                                                max={ 100 }
                                            />
                                        );
                                    } else if ( 'tablet' === tab.name ) {
                                        tabout = (
                                            <RangeControl
                                                value={ ( ( undefined !== gutter && undefined !== gutter[ 1 ] ) ? gutter[ 1 ] : '' ) }
                                                onChange={ value => setAttributes( { gutter: [ ( ( undefined !== gutter && undefined !== gutter[ 0 ] ) ? gutter[ 0 ] : '' ), value, ( ( undefined !== gutter && undefined !== gutter[ 2 ] ) ? gutter[ 2 ] : '' ) ] } ) }
                                                step={ 2 }
                                                min={ 0 }
                                                max={ 100 }
                                            />
                                        );
                                    } else {
                                        tabout = (
                                            <RangeControl
                                                value={ ( ( undefined !== gutter && undefined !== gutter[ 0 ] ) ? gutter[ 0 ] : '' ) }
                                                onChange={ value => setAttributes( { gutter: [ value, ( ( undefined !== gutter && undefined !== gutter[ 1 ] ) ? gutter[ 1 ] : '' ), ( ( undefined !== gutter && undefined !== gutter[ 2 ] ) ? gutter[ 2 ] : '' ) ] } ) }
                                                step={ 2 }
                                                min={ 0 }
                                                max={ 100 }
                                            />
                                        );
                                    }
                                }
                                return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
                            }
                        }
                    </TabPanel>
                </Fragment>
            {/* { ids && undefined !== ids[ 0 ] && (
                <ImageSizeControl
                    label={ __( 'Thumbnail Image Size', 'kadence-blocks' ) }
                    slug={ thumbSize }
                    id={ ids[ 0 ] }
                    fullSelection={ true }
                    selectByValue={ false }
                    onChange={ this.changeImageThumbSize }
                />
            ) } */}
        </PanelBody>
        { type && (  type === 'slider' ) && (
            <Fragment>
                    <PanelBody
                        title={ __( 'Carousel Settings', 'kadence-blocks' ) }
                        initialOpen={ false }
                    >
                        <ToggleControl
                            label={ __( 'Carousel Auto Play', 'kadence-blocks' ) }
                            checked={ autoPlay }
                            onChange={ ( value ) => setAttributes( { autoPlay: value } ) }
                        />
                        { autoPlay && (
                            <RangeControl
                                label={ __( 'Autoplay Speed', 'kadence-blocks' ) }
                                value={ autoSpeed }
                                onChange={ ( value ) => setAttributes( { autoSpeed: value } ) }
                                min={ 500 }
                                max={ 15000 }
                                step={ 10 }
                            />
                        ) }
                        <RangeControl
                            label={ __( 'Carousel Slide Transition Speed', 'kadence-blocks' ) }
                            value={ transSpeed }
                            onChange={ ( value ) => setAttributes( { transSpeed: value } ) }
                            min={ 100 }
                            max={ 2000 }
                            step={ 10 }
                        />
                        { type === 'carousel' && (
                            <SelectControl
                                label={ __( 'Slides to Scroll', 'kadence-blocks' ) }
                                options={ [
                                    {
                                        label: __( 'One' ),
                                        value: '1',
                                    },
                                    {
                                        label: __( 'All' ),
                                        value: 'all',
                                    },
                                ] }
                                value={ slidesScroll }
                                onChange={ ( value ) => setAttributes( { slidesScroll: value } ) }
                            />
                        ) }
                        <SelectControl
                            label={ __( 'Arrow Style', 'kadence-blocks' ) }
                            options={ [
                                {
                                    label: __( 'White on Dark', 'kadence-blocks' ),
                                    value: 'whiteondark',
                                },
                                {
                                    label: __( 'Black on Light', 'kadence-blocks' ),
                                    value: 'blackonlight',
                                },
                                {
                                    label: __( 'Outline Black', 'kadence-blocks' ),
                                    value: 'outlineblack',
                                },
                                {
                                    label: __( 'Outline White', 'kadence-blocks' ),
                                    value: 'outlinewhite',
                                },
                                {
                                    label: __( 'None', 'kadence-blocks' ),
                                    value: 'none',
                                },
                            ] }
                            value={ arrowStyle }
                            onChange={ ( value ) => setAttributes( { arrowStyle: value } ) }
                        />
                        { type !== 'thumbslider' && (
                            <SelectControl
                                label={ __( 'Dot Style', 'kadence-blocks' ) }
                                options={ [
                                    {
                                        label: __( 'Dark', 'kadence-blocks' ),
                                        value: 'dark',
                                    },
                                    {
                                        label: __( 'Light', 'kadence-blocks' ),
                                        value: 'light',
                                    },
                                    {
                                        label: __( 'Outline Dark', 'kadence-blocks' ),
                                        value: 'outlinedark',
                                    },
                                    {
                                        label: __( 'Outline Light', 'kadence-blocks' ),
                                        value: 'outlinelight',
                                    },
                                    {
                                        label: __( 'None', 'kadence-blocks' ),
                                        value: 'none',
                                    },
                                ] }
                                value={ dotStyle }
                                onChange={ ( value ) => setAttributes( { dotStyle: value } ) }
                            />
                        ) }
                    </PanelBody>
            </Fragment>
        ) }
        {/* <PanelBody
            title={ __( 'Link Settings', 'kadence-blocks' ) }
            initialOpen={ false }
        >
            <SelectControl
                label={ __( 'Link To', 'kadence-blocks' ) }
                value={ linkTo }
                onChange={ this.setLinkTo }
                options={ linkOptions }
            />
            { linkTo === 'media' && (
                <Fragment>
                    { ids && undefined !== ids[ 0 ] && (
                        <ImageSizeControl
                            label={ __( 'Link Image Size', 'kadence-blocks' ) }
                            slug={ lightSize }
                            id={ ids[ 0 ] }
                            fullSelection={ true }
                            selectByValue={ false }
                            onChange={ this.changeImageLightSize }
                        />
                    ) }
                        <Fragment>
                            <SelectControl
                                label={ __( 'Link Triggers?', 'kadence-blocks' ) }
                                value={ lightbox }
                                onChange={ ( value ) => setAttributes( { lightbox: value } ) }
                                options={ [
                                    {
                                        label: __( 'None', 'kadence-blocks' ),
                                        value: 'none',
                                    },
                                    {
                                        label: __( 'Lightbox', 'kadence-blocks' ),
                                        value: 'magnific',
                                    },
                                    {
                                        label: __( 'New Tab', 'kadence-blocks' ),
                                        value: 'new_tab',
                                    },
                                ] }
                            />
                            { lightbox && lightbox === 'magnific' && (
                                <ToggleControl
                                    label={ __( 'Show Caption in Lightbox', 'kadence-blocks' ) }
                                    checked={ lightboxCaption }
                                    onChange={ ( value ) => setAttributes( { lightboxCaption: value } ) }
                                />
                            ) }
                        </Fragment>
                </Fragment>
            ) }
        </PanelBody> */}
            {/* <PanelBody
                title={ __( 'Image Style', 'kadence-blocks' ) }
                initialOpen={ false }
            >
                { ! ( type === 'carousel' && imageRatio === 'inherit' ) && ! ( type === 'slider' && imageRatio === 'inherit' ) && (
                    <MeasurementControls
                        label={ __( 'Border Radius', 'kadence-blocks' ) }
                        measurement={ imageRadius }
                        control={ this.state.radiusControl }
                        onChange={ ( value ) => setAttributes( { imageRadius: value } ) }
                        onControl={ ( value ) => this.setState( { radiusControl: value } ) }
                        min={ 0 }
                        max={ 200 }
                        step={ 1 }
                        controlTypes={ [
                            { key: 'linked', name: __( 'Linked', 'kadence-blocks' ), icon: icons.radiuslinked },
                            { key: 'individual', name: __( 'Individual', 'kadence-blocks' ), icon: icons.radiusindividual },
                        ] }
                        firstIcon={ icons.topleft }
                        secondIcon={ icons.topright }
                        thirdIcon={ icons.bottomright }
                        fourthIcon={ icons.bottomleft }
                    />
                ) }
                <SelectControl
                    label={ __( 'Image Filter', 'kadence-blocks' ) }
                    help={ __( 'Not supported in Internet Explorer', 'kadence-blocks' ) }
                    options={ [
                        {
                            label: __( 'None', 'kadence-blocks' ),
                            value: 'none',
                        },
                        {
                            label: __( 'Grayscale', 'kadence-blocks' ),
                            value: 'grayscale',
                        },
                        {
                            label: __( 'Sepia', 'kadence-blocks' ),
                            value: 'sepia',
                        },
                        {
                            label: __( 'Saturation', 'kadence-blocks' ),
                            value: 'saturation',
                        },
                        {
                            label: __( 'Vintage', 'kadence-blocks' ),
                            value: 'vintage',
                        },
                        {
                            label: __( 'Earlybird', 'kadence-blocks' ),
                            value: 'earlybird',
                        },
                        {
                            label: __( 'Toaster', 'kadence-blocks' ),
                            value: 'toaster',
                        },
                        {
                            label: __( 'Mayfair', 'kadence-blocks' ),
                            value: 'mayfair',
                        },
                    ] }
                    value={ imageFilter }
                    onChange={ ( value ) => setAttributes( { imageFilter: value } ) }
                />
            </PanelBody> */}
            {/* <PanelBody
                title={ __( 'Caption Settings', 'kadence-blocks' ) }
                initialOpen={ false }
            >
                <ToggleControl
                    label={ __( 'Show Captions', 'kadence-blocks' ) }
                    checked={ showCaption }
                    onChange={ this.setCaptions }
                />
                { showCaption && (
                    <Fragment>
                        <SelectControl
                            label={ __( 'Caption Placement', 'kadence-blocks' ) }
                            options={ [
                                {
                                    label: __( 'Bottom of Image - Show on Hover', 'kadence-blocks' ),
                                    value: 'bottom-hover',
                                },
                                {
                                    label: __( 'Bottom of Image - Show always', 'kadence-blocks' ),
                                    value: 'bottom',
                                },
                                {
                                    label: __( 'Below Image - Show always', 'kadence-blocks' ),
                                    value: 'below',
                                },
                                {
                                    label: __( 'Cover Image - Show on Hover', 'kadence-blocks' ),
                                    value: 'cover-hover',
                                },
                            ] }
                            value={ captionStyle }
                            onChange={ ( value ) => setAttributes( { captionStyle: value } ) }
                        />
                        { ( 'cover-hover' === captionStyle || 'bottom-hover' === captionStyle ) && (
                            <ToggleControl
                                label={ __( 'Force hover effect always for mobile', 'kadence-blocks' ) }
                                checked={ mobileForceHover }
                                onChange={ value => setAttributes( { mobileForceHover: value } ) }
                            />
                        ) }
                        <AdvancedPopColorControl
                            label={ __( 'Caption Color', 'kadence-blocks' ) }
                            colorValue={ ( captionStyles && captionStyles[ 0 ] && captionStyles[ 0 ].color ? captionStyles[ 0 ].color : '' ) }
                            colorDefault={ '' }
                            onColorChange={ value => saveCaptionFont( { color: value } ) }
                        />
                        <AdvancedPopColorControl
                            label={ __( 'Caption Background', 'kadence-blocks' ) }
                            colorValue={ ( captionStyles && captionStyles[ 0 ] && captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '' ) }
                            colorDefault={ '#000000' }
                            onColorChange={ value => saveCaptionFont( { background: value } ) }
                            opacityValue={ ( captionStyles && captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].backgroundOpacity ? captionStyles[ 0 ].backgroundOpacity : 0.5 ) }
                            onOpacityChange={ value => saveCaptionFont( { backgroundOpacity: value } ) }
                        /> 
                        <TypographyControls
                            fontSize={ captionStyles[ 0 ].size }
                            onFontSize={ ( value ) => saveCaptionFont( { size: value } ) }
                            fontSizeType={ captionStyles[ 0 ].sizeType }
                            onFontSizeType={ ( value ) => saveCaptionFont( { sizeType: value } ) }
                            lineHeight={ captionStyles[ 0 ].lineHeight }
                            onLineHeight={ ( value ) => saveCaptionFont( { lineHeight: value } ) }
                            lineHeightType={ captionStyles[ 0 ].lineType }
                            onLineHeightType={ ( value ) => saveCaptionFont( { lineType: value } ) }
                            letterSpacing={ captionStyles[ 0 ].letterSpacing }
                            onLetterSpacing={ ( value ) => saveCaptionFont( { letterSpacing: value } ) }
                            textTransform={ captionStyles[ 0 ].textTransform }
                            onTextTransform={ ( value ) => saveCaptionFont( { textTransform: value } ) }
                            fontFamily={ captionStyles[ 0 ].family }
                            onFontFamily={ ( value ) => saveCaptionFont( { family: value } ) }
                            onFontChange={ ( select ) => {
                                saveCaptionFont( {
                                    family: select.value,
                                    google: select.google,
                                } );
                            } }
                            onFontArrayChange={ ( values ) => saveCaptionFont( values ) }
                            googleFont={ captionStyles[ 0 ].google }
                            onGoogleFont={ ( value ) => saveCaptionFont( { google: value } ) }
                            loadGoogleFont={ captionStyles[ 0 ].loadGoogle }
                            onLoadGoogleFont={ ( value ) => saveCaptionFont( { loadGoogle: value } ) }
                            fontVariant={ captionStyles[ 0 ].variant }
                            onFontVariant={ ( value ) => saveCaptionFont( { variant: value } ) }
                            fontWeight={ captionStyles[ 0 ].weight }
                            onFontWeight={ ( value ) => saveCaptionFont( { weight: value } ) }
                            fontStyle={ captionStyles[ 0 ].style }
                            onFontStyle={ ( value ) => saveCaptionFont( { style: value } ) }
                            fontSubset={ captionStyles[ 0 ].subset }
                            onFontSubset={ ( value ) => saveCaptionFont( { subset: value } ) }
                        />
                    </Fragment>
                ) }
            </PanelBody> */}
            <PanelBody
                title={ __( 'Image Shadow', 'kadence-blocks' ) }
                initialOpen={ false }
            >
                <ToggleControl
                    label={ __( 'Enable Shadow', 'kadence-blocks' ) }
                    checked={ displayShadow }
                    onChange={ value => setAttributes( { displayShadow: value } ) }
                />
                { displayShadow && (
                    <TabPanel className="kt-inspect-tabs kt-hover-tabs"
                        activeClass="active-tab"
                        tabs={ [
                            {
                                name: 'normal',
                                title: __( 'Normal' ),
                                className: 'kt-normal-tab',
                            },
                            {
                                name: 'hover',
                                title: __( 'Hover' ),
                                className: 'kt-hover-tab',
                            },
                        ] }>
                        {
                            ( tab ) => {
                                let tabout;
                                if ( tab.name ) {
                                    if ( 'hover' === tab.name ) {
                                        tabout = (
                                            <Fragment>
                                                {/* <AdvancedPopColorControl
                                                    label={ __( 'Shadow Color', 'kadence-blocks' ) }
                                                    colorValue={ ( shadowHover[ 0 ].color ? shadowHover[ 0 ].color : '' ) }
                                                    colorDefault={ '' }
                                                    onColorChange={ value => saveShadowHover( { color: value } ) }
                                                    opacityValue={ shadowHover[ 0 ].opacity }
                                                    onOpacityChange={ value => saveShadowHover( { opacity: value } ) }
                                                /> */}
                                                <RangeControl
                                                    label={ __( 'Shadow Blur', 'kadence-blocks' ) }
                                                    value={ shadowHover[ 0 ].blur }
                                                    onChange={ value => saveShadowHover( { blur: value } ) }
                                                    min={ 0 }
                                                    max={ 100 }
                                                    step={ 1 }
                                                />
                                                <RangeControl
                                                    label={ __( 'Shadow Spread', 'kadence-blocks' ) }
                                                    value={ shadowHover[ 0 ].spread }
                                                    onChange={ value => saveShadowHover( { spread: value } ) }
                                                    min={ -100 }
                                                    max={ 100 }
                                                    step={ 1 }
                                                />
                                                <RangeControl
                                                    label={ __( 'Shadow Vertical Offset', 'kadence-blocks' ) }
                                                    value={ shadowHover[ 0 ].vOffset }
                                                    onChange={ value => saveShadowHover( { vOffset: value } ) }
                                                    min={ -100 }
                                                    max={ 100 }
                                                    step={ 1 }
                                                />
                                                <RangeControl
                                                    label={ __( 'Shadow Horizontal Offset', 'kadence-blocks' ) }
                                                    value={ shadowHover[ 0 ].hOffset }
                                                    onChange={ value => saveShadowHover( { hOffset: value } ) }
                                                    min={ -100 }
                                                    max={ 100 }
                                                    step={ 1 }
                                                />
                                            </Fragment>
                                        );
                                    } else {
                                        tabout = (
                                            <Fragment>
                                                {/* <AdvancedPopColorControl
                                                    label={ __( 'Shadow Color', 'kadence-blocks' ) }
                                                    colorValue={ ( shadow[ 0 ].color ? shadow[ 0 ].color : '' ) }
                                                    colorDefault={ '' }
                                                    onColorChange={ value => saveShadow( { color: value } ) }
                                                    opacityValue={ shadow[ 0 ].opacity }
                                                    onOpacityChange={ value => saveShadow( { opacity: value } ) }
                                                /> */}
                                                <RangeControl
                                                    label={ __( 'Shadow Blur', 'kadence-blocks' ) }
                                                    value={ shadow[ 0 ].blur }
                                                    onChange={ value => saveShadow( { blur: value } ) }
                                                    min={ 0 }
                                                    max={ 100 }
                                                    step={ 1 }
                                                />
                                                <RangeControl
                                                    label={ __( 'Shadow Spread', 'kadence-blocks' ) }
                                                    value={ shadow[ 0 ].spread }
                                                    onChange={ value => saveShadow( { spread: value } ) }
                                                    min={ -100 }
                                                    max={ 100 }
                                                    step={ 1 }
                                                />
                                                <RangeControl
                                                    label={ __( 'Shadow Vertical Offset', 'kadence-blocks' ) }
                                                    value={ shadow[ 0 ].vOffset }
                                                    onChange={ value => saveShadow( { vOffset: value } ) }
                                                    min={ -100 }
                                                    max={ 100 }
                                                    step={ 1 }
                                                />
                                                <RangeControl
                                                    label={ __( 'Shadow Horizontal Offset', 'kadence-blocks' ) }
                                                    value={ shadow[ 0 ].hOffset }
                                                    onChange={ value => saveShadow( { hOffset: value } ) }
                                                    min={ -100 }
                                                    max={ 100 }
                                                    step={ 1 }
                                                />
                                            </Fragment>
                                        );
                                    }
                                }
                                return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
                            }
                        }
                    </TabPanel>
                ) }
            </PanelBody>
            {/* <PanelBody
                title={ __( 'Gallery Spacing', 'kadence-blocks' ) }
                initialOpen={ false }
            >
                <ButtonGroup className="kt-size-type-options kt-row-size-type-options" aria-label={ __( 'Margin Type', 'kadence-blocks' ) }>
                    { map( marginTypes, ( { name, key } ) => (
                        <Button
                            key={ key }
                            className="kt-size-btn"
                            isSmall
                            isPrimary={ marginUnit === key }
                            aria-pressed={ marginUnit === key }
                            onClick={ () => setAttributes( { marginUnit: key } ) }
                        >
                            { name }
                        </Button>
                    ) ) }
                </ButtonGroup>
                
            </PanelBody> */}
    </InspectorControls>
     );
   }
 }
 