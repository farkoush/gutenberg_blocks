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
	{ value: 'masonry', label: __( 'Masonry', 'kadence-blocks' ), icon: icons.galMasonry, isDisabled: false },
	{ value: 'grid', label: __( 'Grid', 'kadence-blocks' ), icon: icons.galGrid, isDisabled: false },
	{ value: 'carousel', label: __( 'Carousel', 'kadence-blocks' ), icon: icons.galCarousel, isDisabled: false },
	{ value: 'fluidcarousel', label: __( 'Fluid Carousel', 'kadence-blocks' ), icon: icons.galFluid, isDisabled: false },
	{ value: 'slider', label: __( 'Slider', 'kadence-blocks' ), icon: icons.galSlider, isDisabled: false },
	{ value: 'thumbslider', label: __( 'Thumbnail Slider (Pro addon)', 'kadence-blocks' ), icon: icons.thumbslider, isDisabled: true },
	{ value: 'tiles', label: __( 'Tiles (Pro addon)', 'kadence-blocks' ), icon: icons.galtiles, isDisabled: true },
	// { value: 'mosaic', label: __( 'Mosaic (Pro only)', 'kadence-blocks' ), icon: icons.galSlider, isDisabled: true },
];
/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
const kbGalleryUniqueIDs = [];

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class GalleryEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onSelectImages = this.onSelectImages.bind( this );
		this.setLinkTo = this.setLinkTo.bind( this );
		this.changeImageThumbSize = this.changeImageThumbSize.bind( this );
		this.changeImageLightSize = this.changeImageLightSize.bind( this );
		this.showSettings = this.showSettings.bind( this );
		this.setColumnsNumber = this.setColumnsNumber.bind( this );
		this.setCaptions = this.setCaptions.bind( this );
		this.toggleImageCrop = this.toggleImageCrop.bind( this );
		this.onMove = this.onMove.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBackward = this.onMoveBackward.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onUploadError = this.onUploadError.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );
		this.setAttributes = this.setAttributes.bind( this );
		this.saveImageAttributes = debounce( this.saveImageAttributes.bind( this ), 1000 );
		this.carouselSizeTrigger = debounce( this.carouselSizeTrigger.bind( this ), 250 );
		this.bindSlider = this.bindSlider.bind( this );
		this.bindThumbs = this.bindThumbs.bind( this );

		this.state = {
			selectedImage: null,
			imageAttributes: {},
			settings: {},
			marginDeskControl: 'linked',
			marginTabletControl: 'linked',
			marginMobileControl: 'linked',
			radiusControl: 'linked',
			// user: ( kadence_blocks_params.userrole ? kadence_blocks_params.userrole : 'admin' ),
			user: 'admin',
		};
	}
	showSettings( key ) {
		if ( undefined === this.state.settings[ key ] || 'all' === this.state.settings[ key ] ) {
			return true;
		} else if ( 'contributor' === this.state.settings[ key ] && ( 'contributor' === this.state.user || 'author' === this.state.user || 'editor' === this.state.user || 'admin' === this.state.user ) ) {
			return true;
		} else if ( 'author' === this.state.settings[ key ] && ( 'author' === this.state.user || 'editor' === this.state.user || 'admin' === this.state.user ) ) {
			return true;
		} else if ( 'editor' === this.state.settings[ key ] && ( 'editor' === this.state.user || 'admin' === this.state.user ) ) {
			return true;
		} else if ( 'admin' === this.state.settings[ key ] && 'admin' === this.state.user ) {
			return true;
		}
		return false;
	}
	setAttributes( attributes ) {
		if ( attributes.ids ) {
			throw new Error( 'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes' );
		}

		if ( attributes.images ) {
			attributes = {
				...attributes,
				ids: map( attributes.images, 'id' ),
			};
		}

		this.props.setAttributes( attributes );
	}
	bindSlider( ref ) {
		this.sliderSlides = ref;
	}
	bindThumbs( ref ) {
		this.sliderThumbs = ref;
	}
	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
				} );
			}
		};
	}

	onMove( oldIndex, newIndex ) {
		const images = [ ...this.props.attributes.images ];
		images.splice( newIndex, 1, this.props.attributes.images[ oldIndex ] );
		images.splice( oldIndex, 1, this.props.attributes.images[ newIndex ] );
		this.setState( { selectedImage: newIndex } );
		this.setAttributes( { images } );
	}

	onMoveForward( oldIndex ) {
		return () => {
			if ( oldIndex === this.props.attributes.images.length - 1 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex + 1 );
		};
	}

	onMoveBackward( oldIndex ) {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex - 1 );
		};
	}

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
			this.setState( { selectedImage: null } );
			this.setAttributes( {
				images,
			} );
		};
	}

	onSelectImages( imgs ) {
		const { lightSize, thumbSize, images } = this.props.attributes;
		this.setAttributes( {
			images: imgs.map( ( image ) => pickRelevantMediaFiles( image, lightSize, thumbSize, images ) ),
		} );
	}

	onUploadError( message ) {
		const { noticeOperations } = this.props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	}

	setCaptions( value ) {
		this.setAttributes( { showCaption: value } );
		if ( value ) {
			const { lightSize, thumbSize, images } = this.props.attributes;
			if ( images ) {
				this.setAttributes( {
					images: images.map( ( image ) => pickRelevantMediaFilesUpdate( image, lightSize, thumbSize ) ),
				} );
			}
		}
	}

	changeImageThumbSize( img ) {
		const { lightSize, images } = this.props.attributes;
		this.setAttributes( { thumbSize: img.slug } );
		this.setAttributes( {
			images: images.map( ( image ) => pickRelevantMediaFilesUpdate( image, lightSize, img.slug ) ),
		} );
	}
	changeImageLightSize( img ) {
		const { thumbSize, images } = this.props.attributes;
		this.setAttributes( { lightSize: img.slug } );
		this.setAttributes( {
			images: images.map( ( image ) => pickRelevantMediaFilesUpdate( image, img.slug, thumbSize ) ),
		} );
	}

	setLinkTo( value ) {
		this.setAttributes( { linkTo: value } );
	}

	setColumnsNumber( value ) {
		this.setAttributes( { columns: value } );
	}

	toggleImageCrop() {
		this.setAttributes( { imageCrop: ! this.props.attributes.imageCrop } );
	}

	getImageCropHelp( checked ) {
		return checked ? __( 'Thumbnails are cropped to align.', 'kadence-blocks' ) : __( 'Thumbnails are not cropped.', 'kadence-blocks' );
	}
	saveImageAttributes( id, attributes ) {
		const data = new window.FormData();
		forEach( attributes, ( ( value, key ) => data.append( key, value ) ) );
		apiFetch( {
			path: '/wp/v2/media/' + id,
			body: data,
			method: 'POST',
		} );
	}
	setImageAttributes( index, attributes ) {
		const { attributes: { images } } = this.props;
		const { setAttributes } = this;
		if ( ! images[ index ] ) {
			return;
		}
		if ( images[ index ].id ) {
			this.saveImageAttributes( images[ index ].id, attributes );
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...attributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	}
	setLinkAttributes( index, attributes ) {
		const { attributes: { images } } = this.props;
		const { setAttributes } = this;
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...attributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	}
	componentDidMount() {
		const { attributes, mediaUpload } = this.props;
		const { images, uniqueID } = attributes;
		if ( ! uniqueID ) {
			// const blockConfigObject = ( kadence_blocks_params.configuration ? JSON.parse( kadence_blocks_params.configuration ) : [] );
			// if ( blockConfigObject[ 'kadence/advancedgallery' ] !== undefined && typeof blockConfigObject[ 'kadence/advancedgallery' ] === 'object' ) {
			// 	Object.keys( blockConfigObject[ 'kadence/advancedgallery' ] ).map( ( attribute ) => {
			// 		this.props.attributes[ attribute ] = blockConfigObject[ 'kadence/advancedgallery' ][ attribute ];
			// 	} );
			// }
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
			kbGalleryUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
		} else if ( kbGalleryUniqueIDs.includes( uniqueID ) ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
			kbGalleryUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
		} else {
			kbGalleryUniqueIDs.push( uniqueID );
		}
		if ( every( images, ( { url } ) => isBlobURL( url ) ) ) {
			const filesList = map( images, ( { url } ) => getBlobByURL( url ) );
			forEach( images, ( { url } ) => revokeBlobURL( url ) );
			mediaUpload( {
				filesList,
				onFileChange: this.onSelectImages,
				allowedTypes: [ 'image' ],
			} );
		}
		// const blockSettings = ( kadence_blocks_params.settings ? JSON.parse( kadence_blocks_params.settings ) : {} );
		// if ( blockSettings[ 'kadence/advancedgallery' ] !== undefined && typeof blockSettings[ 'kadence/advancedgallery' ] === 'object' ) {
		// 	this.setState( { settings: blockSettings[ 'kadence/advancedgallery' ] } );
		// }
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
				captionSelected: false,
			} );
		}
	}
	carouselSizeTrigger() {
		const carousel = document.getElementById( 'kb-gallery-id-' + this.props.attributes.uniqueID );
		if ( carousel ) {
			const width = Math.floor( ( 80 / 100 ) * carousel.offsetWidth );
			carousel.querySelectorAll( '.slick-slide' ).forEach( function( item ) {
				item.style.maxWidth = width + 'px';
			} );
		}
	}
	render() {
		const { attributes, isSelected, className, noticeUI, setAttributes } = this.props;
		const { uniqueID, images, columns, linkTo, ids, columnControl, showCaption, captionStyles, lightbox, lightSize, type, imageRatio, captionStyle, gutter, thumbSize, autoPlay, autoSpeed, transSpeed, slidesScroll, arrowStyle, dotStyle, imageRadius, margin, marginUnit, displayShadow, shadow, shadowHover, carouselHeight, imageFilter, lightboxCaption, carouselAlign, thumbnailColumns, thumbnailControl, thumbnailRatio, mobileForceHover } = attributes;
		const galleryTypes = applyFilters( 'kadence.galleryTypes', typeOptions );
		const hasImages = !! images.length;
		console.log('images');
		console.log(images)
		console.log('images.length');
		console.log(images.length)
		console.log('ids')
		console.log(ids)
		const gconfig = {
			google: {
				families: [ captionStyles[ 0 ].family + ( captionStyles[ 0 ].variant ? ':' + captionStyles[ 0 ].variant : '' ) ],
			},
		};
		const config = ( captionStyles[ 0 ].google ? gconfig : '' );
		const saveCaptionFont = ( value ) => {
			const newUpdate = captionStyles.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				captionStyles: newUpdate,
			} );
		};
		function CustomNextArrow( props ) {
			const { className, style, onClick } = props;
			return (
				<button
					className={ className }
					style={ { ...style, display: 'block' } }
					onClick={ onClick }
				>
					<Dashicon icon="arrow-right-alt2" />
				</button>
			);
		}

		function CustomPrevArrow( props ) {
			const { className, style, onClick } = props;
			return (
				<button
					className={ className }
					style={ { ...style, display: 'block' } }
					onClick={ onClick }
				>
					<Dashicon icon="arrow-left-alt2" />
				</button>
			);
		}
		const carouselSettings = {
			dots: ( dotStyle === 'none' ? false : true ),
			arrows: ( arrowStyle === 'none' ? false : true ),
			infinite: true,
			speed: transSpeed,
			draggable: false,
			autoplaySpeed: autoSpeed,
			autoplay: autoPlay,
			slidesToShow: columns[ 0 ],
			slidesToScroll: ( slidesScroll === 'all' ? columns[ 0 ] : 1 ),
			nextArrow: <CustomNextArrow />,
			prevArrow: <CustomPrevArrow />,
		};
		const fluidCarouselSettings = {
			dots: ( dotStyle === 'none' ? false : true ),
			arrows: ( arrowStyle === 'none' ? false : true ),
			infinite: true,
			speed: transSpeed,
			draggable: false,
			autoplaySpeed: autoSpeed,
			autoplay: autoPlay,
			centerMode: ( carouselAlign === false ? false : true ),
			variableWidth: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <CustomNextArrow />,
			prevArrow: <CustomPrevArrow />,
			onInit: this.carouselSizeTrigger,
			onReInit: this.carouselSizeTrigger,
		};
		const sliderSettings = {
			dots: ( dotStyle === 'none' ? false : true ),
			arrows: ( arrowStyle === 'none' ? false : true ),
			infinite: true,
			fade: true,
			speed: transSpeed,
			draggable: false,
			autoplaySpeed: autoSpeed,
			autoplay: autoPlay,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <CustomNextArrow />,
			prevArrow: <CustomPrevArrow />,
		};
		const thumbsliderSettings = {
			dots: false,
			arrows: ( arrowStyle === 'none' ? false : true ),
			infinite: true,
			fade: true,
			speed: transSpeed,
			draggable: false,
			autoplaySpeed: autoSpeed,
			autoplay: autoPlay,
			slidesToShow: 1,
			slidesToScroll: 1,
			onInit: this.onSelectImage( 0 ),
			nextArrow: <CustomNextArrow />,
			prevArrow: <CustomPrevArrow />,
		};
		const thumbsliderthumbsSettings = {
			dots: false,
			arrows: ( arrowStyle === 'none' ? false : true ),
			infinite: true,
			fade: false,
			speed: transSpeed,
			draggable: false,
			autoplaySpeed: autoSpeed,
			autoplay: autoPlay,
			slidesToShow: thumbnailColumns[ 0 ],
			slidesToScroll: 1,
			nextArrow: <CustomNextArrow />,
			prevArrow: <CustomPrevArrow />,
			swipeToSlide: true,
			focusOnSelect: true,
		};
		const controls = (
			<BlockControls>
				{ hasImages && (
					<Toolbar>
						<MediaUpload
							onSelect={ this.onSelectImages }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							multiple
							gallery
							value={ images.map( ( img ) => img.id ) }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit gallery', 'kadence-blocks' ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				) }
			</BlockControls>
		);

		const mediaPlaceholder = (
			<MediaPlaceholder
				addToGallery={ hasImages }
				isAppender={ hasImages }
				className={ className }
				dropZoneUIOnly={ hasImages && ! isSelected }
				icon={ ! hasImages && <BlockIcon icon={ icon } /> }
				labels={ {
					title: ! hasImages && __( 'Gallery', 'kadence-blocks' ),
					instructions: ! hasImages && __( 'Drag images, upload new ones or select files from your library.', 'kadence-blocks' ),
				} }
				onSelect={ this.onSelectImages }
				accept="image/*"
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				multiple
				value={ hasImages ? images : undefined }
				onError={ this.onUploadError }
				notices={ hasImages ? undefined : noticeUI }
			/>
		);
		const buildCSS = (
			<style>
				{ `
					.wp-block[data-type="kadence/advancedgallery"]  ul.kb-gallery-main-contain.kb-gallery-id-${ uniqueID } {
						${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'margin: -' + ( gutter[ 0 ] / 2 ) + 'px;' : '' ) }
					}
					.kb-gallery-id-${ uniqueID } .kadence-blocks-gallery-item {
						${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'padding:' + ( gutter[ 0 ] / 2 ) + 'px;' : '' ) }
					}
					.kb-gallery-main-contain.kb-gallery-type-carousel.kb-gallery-id-${ uniqueID } .kt-blocks-carousel .slick-slider,
					.kb-gallery-main-contain.kb-gallery-type-thumbslider.kb-gallery-id-${ uniqueID } .kt-blocks-carousel-thumbnails.slick-slider {
						${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'margin: 0 -' + ( gutter[ 0 ] / 2 ) + 'px;' : '' ) }
					}
					.kb-gallery-main-contain.kb-gallery-type-carousel.kb-gallery-id-${ uniqueID } .kt-blocks-carousel .slick-slider .slick-slide,
					.kb-gallery-main-contain.kb-gallery-type-fluidcarousel.kb-gallery-id-${ uniqueID } .kt-blocks-carousel .slick-slider .slick-slide,
					.kb-gallery-main-contain.kb-gallery-type-thumbslider.kb-gallery-id-${ uniqueID } .kt-blocks-carousel-thumbnails.slick-slider .slick-slide {
						${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'padding: 4px ' + ( gutter[ 0 ] / 2 ) + 'px;' : '' ) }
					}
					.kb-gallery-main-contain.kb-gallery-type-fluidcarousel.kb-gallery-id-${ uniqueID } .kt-blocks-carousel.kb-carousel-mode-align-left .slick-slider .slick-slide {
						${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'padding: 4px ' + ( gutter[ 0 ] ) + 'px 4px 0;' : '' ) }
					}
					.kb-gallery-main-contain.kb-gallery-type-carousel.kb-gallery-id-${ uniqueID } .kt-blocks-carousel .slick-prev,
					.kb-gallery-main-contain.kb-gallery-type-thumbslider.kb-gallery-id-${ uniqueID } .kt-blocks-carousel-thumbnails .slick-prev {
						${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'left:' + ( gutter[ 0 ] / 2 ) + 'px;' : '' ) }
					}
					.kb-gallery-main-contain.kb-gallery-type-carousel.kb-gallery-id-${ uniqueID } .kt-blocks-carousel .slick-next,
					.kb-gallery-main-contain.kb-gallery-type-thumbslider.kb-gallery-id-${ uniqueID } .kt-blocks-carousel-thumbnails .slick-next {
						${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'right:' + ( gutter[ 0 ] / 2 ) + 'px;' : '' ) }
					}
					${ ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].background ? `.kb-gallery-id-${ uniqueID }.kb-gallery-main-contain .kadence-blocks-gallery-item .kadence-blocks-gallery-item-inner figcaption { background: linear-gradient( 0deg, ` + KadenceColorOutput( ( captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '#000000' ), ( '' !== captionStyles[ 0 ].backgroundOpacity ? captionStyles[ 0 ].backgroundOpacity : 0.5 ) ) + ' 0, ' + KadenceColorOutput( ( captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '#000000' ), 0 ) + ' 100% );}' : '' ) }
					${ ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].background ? `.kb-gallery-id-${ uniqueID }.kb-gallery-caption-style-cover-hover.kb-gallery-main-contain .kadence-blocks-gallery-item .kadence-blocks-gallery-item-inner figcaption, .kb-gallery-id-${ uniqueID }.kb-gallery-caption-style-below.kb-gallery-main-contain .kadence-blocks-gallery-item .kadence-blocks-gallery-item-inner figcaption { background:` + KadenceColorOutput( ( captionStyles[ 0 ].background ? captionStyles[ 0 ].background : '#000000' ), ( '' !== captionStyles[ 0 ].backgroundOpacity ? captionStyles[ 0 ].backgroundOpacity : 0.5 ) ) + ';}' : '' ) }
					${ ( captionStyles && undefined !== captionStyles[ 0 ] && undefined !== captionStyles[ 0 ].color ? `.kb-gallery-id-${ uniqueID } .kadence-blocks-gallery-item .kadence-blocks-gallery-item-inner figcaption { color:` + KadenceColorOutput( captionStyles[ 0 ].color ) + ';}' : '' ) }
					.kb-gallery-id-${ uniqueID } .kadence-blocks-gallery-item .kb-gal-image-radius { box-shadow:${ ( displayShadow ? shadow[ 0 ].hOffset + 'px ' + shadow[ 0 ].vOffset + 'px ' + shadow[ 0 ].blur + 'px ' + shadow[ 0 ].spread + 'px ' + KadenceColorOutput( shadow[ 0 ].color, shadow[ 0 ].opacity ) : 'none' ) }; }
					.kb-gallery-id-${ uniqueID } .kadence-blocks-gallery-item:hover .kb-gal-image-radius { box-shadow:${ ( displayShadow ? shadowHover[ 0 ].hOffset + 'px ' + shadowHover[ 0 ].vOffset + 'px ' + shadowHover[ 0 ].blur + 'px ' + shadowHover[ 0 ].spread + 'px ' + KadenceColorOutput( shadowHover[ 0 ].color, shadowHover[ 0 ].opacity ) : 'none' ) }; }
					.kb-gallery-id-${ uniqueID } .kadence-blocks-gallery-item .kb-gal-image-radius {
						${ ( imageRadius && undefined !== imageRadius[ 0 ] && '' !== imageRadius[ 0 ] ? 'border-radius:' + imageRadius[ 0 ] + 'px ' + imageRadius[ 1 ] + 'px ' + imageRadius[ 2 ] + 'px ' + imageRadius[ 3 ] + 'px;' : '' ) }
					}
					.kb-gallery-main-contain.kb-gallery-type-fluidcarousel.kb-gallery-id-${ uniqueID } .kt-blocks-carousel .slick-list figure .kb-gal-image-radius, .kb-gallery-main-contain.kb-gallery-type-fluidcarousel.kb-gallery-id-${ uniqueID } .kt-blocks-carousel .slick-list figure .kb-gal-image-radius img {
						${ ( carouselHeight && undefined !== carouselHeight[ 0 ] && '' !== carouselHeight[ 0 ] ? 'height:' + carouselHeight[ 0 ] + 'px;' : '' ) }
					}
					.wp-block-kadence-advancedgallery .kb-gallery-type-tiles.kb-gallery-id-${ uniqueID } > .kadence-blocks-gallery-item, .wp-block-kadence-advancedgallery .kb-gallery-type-tiles.kb-gallery-id-${ uniqueID } .kadence-blocks-gallery-item .kadence-blocks-gallery-item-inner img {
						${ ( carouselHeight && undefined !== carouselHeight[ 0 ] && '' !== carouselHeight[ 0 ] ? 'height:' + carouselHeight[ 0 ] + 'px;' : '' ) }
					}
			` }
			</style>
		);
		if ( ! hasImages ) {
			return (
				<Fragment>
					{ controls }
					{ mediaPlaceholder }
				</Fragment>
			);
		}
		// const columnControlTypes = [
		// 	{ key: 'linked', name: __( 'Linked', 'kadence-blocks' ), icon: __( 'Linked', 'kadence-blocks' ) },
		// 	{ key: 'individual', name: __( 'Individual', 'kadence-blocks' ), icon: __( 'Individual', 'kadence-blocks' ) },
		// ];
		const galleryClassNames = classnames(
			'kb-gallery-main-contain',
			{
				[ `kb-gallery-type-${ type }` ]: type,
				[ `kb-gallery-id-${ uniqueID }` ]: uniqueID,
				[ `kb-gallery-caption-style-${ captionStyle }` ]: captionStyle,
				[ `kb-gallery-filter-${ imageFilter }` ]: imageFilter,
			}
		);
		const renderGalleryImages = ( img, index, thumbnail = false ) => {
			/* translators: %1$d is the order number of the image, %2$d is the total number of images. */
			const ariaLabel = sprintf( __( 'image %1$d of %2$d in gallery', 'kadence-blocks' ), ( index + 1 ), images.length );
			const ratio = ( thumbnail ? thumbnailRatio : imageRatio );
			return (
				<li className="kadence-blocks-gallery-item" key={ img.id || img.url }>
					<div className="kadence-blocks-gallery-item-inner">
						<GalleryImage
							thumbUrl={ img.thumbUrl }
							url={ img.url }
							width={ img.width }
							height={ img.height }
							lightUrl={ img.lightUrl }
							alt={ img.alt }
							id={ img.id }
							link={ img.link }
							linkTo={ linkTo }
							isFirstItem={ index === 0 }
							isLastItem={ ( index + 1 ) === images.length }
							isSelected={ isSelected && this.state.selectedImage === index }
							onMoveBackward={ this.onMoveBackward( index ) }
							onMoveForward={ this.onMoveForward( index ) }
							onRemove={ this.onRemoveImage( index ) }
							onSelect={ this.onSelectImage( index ) }
							setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
							caption={ img.caption }
							customLink={ img.customLink }
							linkTarget={ img.linkTarget }
							setLinkAttributes={ ( attrs ) => this.setLinkAttributes( index, attrs ) }
							showCaption={ showCaption }
							captionStyles={ captionStyles }
							captionStyle={ captionStyle }
							aria-label={ ariaLabel }
							imageRatio={ ratio }
							type={ type }
							thumbnail={ thumbnail }
						/>
					</div>
				</li>
			);
		};
		// const typeLabel = galleryTypes.filter( ( item ) => ( item.value === type ) );
		return (
			<div className={ `${ className } kb-gallery-container` } style={ {
				margin: ( undefined !== margin[ 0 ] && undefined !== margin[ 0 ].desk && '' !== margin[ 0 ].desk[ 0 ] ? margin[ 0 ].desk[ 0 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 1 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 2 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 3 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' : undefined ),
			} } >
				{ buildCSS }
				{ controls }
				{ noticeUI }
				{/* { showCaption && captionStyles[ 0 ].google && (
					<WebfontLoader config={ config }>
					</WebfontLoader>
				) } */}
				{ type && type === 'fluidcarousel' && (
					<div id={ `kb-gallery-id-${ uniqueID }` } className={ galleryClassNames }>
						<div className={ `kt-blocks-carousel kt-blocks-fluid-carousel kt-carousel-container-dotstyle-${ dotStyle }${ ( carouselAlign === false ? ' kb-carousel-mode-align-left' : '' ) }` }>
							{ images.length !== 1 && (
								<Slider className={ `kt-carousel-arrowstyle-${ arrowStyle } kt-carousel-dotstyle-${ dotStyle }` } { ...fluidCarouselSettings }>
									{ images.map( ( img, index ) => {
										return renderGalleryImages( img, index );
									} ) }
								</Slider>
							) }
							{ images.length === 1 && (
								images.map( ( img, index ) => {
									return renderGalleryImages( img, index );
								} )
							) }
						</div>
					</div>
				) }
				{ type && type === 'slider' && (
					<div className={ galleryClassNames }>
						<div className={ `kt-blocks-carousel kt-blocks-slider kt-carousel-container-dotstyle-${ dotStyle }` }>
							{ images.length !== 1 && (
								<Slider className={ `kt-carousel-arrowstyle-${ arrowStyle } kt-carousel-dotstyle-${ dotStyle }` } { ...sliderSettings }>
									{ images.map( ( img, index ) => {
										return renderGalleryImages( img, index );
									} ) }
								</Slider>
							) }
							{ images.length === 1 && (
								images.map( ( img, index ) => {
									return renderGalleryImages( img, index );
								} )
							) }
						</div>
					</div>
				) }
				{ type && type === 'thumbslider' && (
					<div className={ galleryClassNames }>
						<div className={ `kt-blocks-carousel kt-blocks-slider kt-carousel-container-dotstyle-${ dotStyle }` }>
							{ images.length !== 1 && (
								<Fragment>
									<Slider asNavFor={ this.sliderThumbs } className={ `kt-carousel-arrowstyle-${ arrowStyle } kt-carousel-dotstyle-${ dotStyle }` } ref={ this.bindSlider } { ...thumbsliderSettings }>
										{ images.map( ( img, index ) => {
											return renderGalleryImages( img, index );
										} ) }
									</Slider>
									<Slider className={ `kt-carousel-arrowstyle-${ arrowStyle } kt-blocks-carousel-thumbnails kb-cloned-${ ( images.length < thumbnailColumns[ 0 ] ? 'hide' : 'show' ) } kt-carousel-dotstyle-none` } asNavFor={ this.sliderSlides } ref={ this.bindThumbs } { ...thumbsliderthumbsSettings }>
										{ images.map( ( img, index ) => {
											return renderGalleryImages( img, index, true );
										} ) }
									</Slider>
								</Fragment>
							) }
							{ images.length === 1 && (
								images.map( ( img, index ) => {
									return renderGalleryImages( img, index );
								} )
							) }
						</div>
					</div>
				) }
				{ type && type === 'carousel' && (
					<div className={ galleryClassNames }
						data-columns-xxl={ columns[ 0 ] }
						data-columns-xl={ columns[ 1 ] }
						data-columns-lg={ columns[ 2 ] }
						data-columns-md={ columns[ 3 ] }
						data-columns-sm={ columns[ 4 ] }
						data-columns-xs={ columns[ 5 ] }
					>
						<div className={ `kt-blocks-carousel kt-carousel-container-dotstyle-${ dotStyle }` }>
							{ images.length > columns[ 0 ] && (
								<Slider className={ `kt-carousel-arrowstyle-${ arrowStyle } kt-carousel-dotstyle-${ dotStyle }` } { ...carouselSettings }>
									{ images.map( ( img, index ) => {
										return renderGalleryImages( img, index );
									} ) }
								</Slider>
							) }
							{ images.length <= columns[ 0 ] && (
								images.map( ( img, index ) => {
									return renderGalleryImages( img, index );
								} )
							) }
						</div>
					</div>
				) }
				{ type && type === 'masonry' && (
					<Masonry
						className={ galleryClassNames }
						elementType={ 'ul' }
						data-columns-xxl={ columns[ 0 ] }
						data-columns-xl={ columns[ 1 ] }
						data-columns-lg={ columns[ 2 ] }
						data-columns-md={ columns[ 3 ] }
						data-columns-sm={ columns[ 4 ] }
						data-columns-xs={ columns[ 5 ] }
						options={ {
							transitionDuration: 0,
						} }
						disableImagesLoaded={ false }
						enableResizableChildren={ true }
						updateOnEachImageLoad={ false }
					>
						{ images.map( ( img, index ) => {
							return renderGalleryImages( img, index );
						} ) }
					</Masonry>
				) }
				{ type && type === 'grid' && (
					<ul
						className={ galleryClassNames }
						data-columns-xxl={ columns[ 0 ] }
						data-columns-xl={ columns[ 1 ] }
						data-columns-lg={ columns[ 2 ] }
						data-columns-md={ columns[ 3 ] }
						data-columns-sm={ columns[ 4 ] }
						data-columns-xs={ columns[ 5 ] }
					>
						{ images.map( ( img, index ) => {
							return renderGalleryImages( img, index );
						} ) }
					</ul>
				) }
				{ type && type === 'tiles' && (
					<ul
						className={ galleryClassNames }
					>
						{ images.map( ( img, index ) => {
							return renderGalleryImages( img, index );
						} ) }
					</ul>
				) }
				{ isSelected && (
					mediaPlaceholder
				) }
			</div>
		);
	}
}
export default compose( [
	withSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		const {
			__experimentalMediaUpload,
			mediaUpload,
		} = getSettings();

		return {
			mediaUpload: mediaUpload ? mediaUpload : __experimentalMediaUpload,
		};
	} ),
	withNotices,
] )( GalleryEdit );
