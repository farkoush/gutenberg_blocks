/**
 * External dependencies
 */
import classnames from 'classnames';
import every from 'lodash/every';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import debounce from 'lodash/debounce';
import KadenceColorOutput from '../../kadence-color-output';
const {
	applyFilters,
} = wp.hooks;
const { apiFetch } = wp;
/**
 * Import Icons
 */
import icons from '../../icons';
/**
 * WordPress dependencies
 */
const { compose } = wp.compose;
const {
	IconButton,
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	Tooltip,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	TabPanel,
	Dashicon,
	withNotices,
	RadioControl,
	TextControl
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
		// this.setLinkTo = this.setLinkTo.bind( this );
		// this.changeImageThumbSize = this.changeImageThumbSize.bind( this );
		// this.changeImageLightSize = this.changeImageLightSize.bind( this );
		// this.setColumnsNumber = this.setColumnsNumber.bind( this );
		this.setCaptions = this.setCaptions.bind( this );
		// this.toggleImageCrop = this.toggleImageCrop.bind( this );
		// this.onMove = this.onMove.bind( this );
		// this.onMoveForward = this.onMoveForward.bind( this );
		// this.onMoveBackward = this.onMoveBackward.bind( this );
		// this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onUploadError = this.onUploadError.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );
		this.setAttributes = this.setAttributes.bind( this );
		// this.saveImageAttributes = debounce( this.saveImageAttributes.bind( this ), 1000 );
		// this.carouselSizeTrigger = debounce( this.carouselSizeTrigger.bind( this ), 250 );
		// this.bindSlider = this.bindSlider.bind( this );
		// this.bindThumbs = this.bindThumbs.bind( this );

		this.state = {
			selectedImage: null,
			imageAttributes: {},
			settings: {},
			marginDeskControl: 'linked',
			marginTabletControl: 'linked',
			marginMobileControl: 'linked',
			radiusControl: 'linked',
			// user: ( kadence_blocks_params.userrole ? kadence_blocks_params.userrole : 'admin' ),
		};
	}
	
	
	updateSliderSetting(event) {
        const selected = event.target.querySelector(
            "#hoora-carousel-loop-setting option:checked"
        );
        this.setAttributes({ loop: selected.value });
        event.preventDefault();
    }
    updateSliderSetting(value) {
        this.setAttributes(value);
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

	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
				} );
			}
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
	render() {
		const { attributes, isSelected, className, noticeUI, setAttributes } = this.props;
		const { uniqueID, images, columns, linkTo, ids, columnControl, showCaption, captionStyles, type, imageRatio, captionStyle, gutter, thumbSize, autoSpeed, transSpeed, slidesScroll, arrowStyle, dotStyle, imageRadius, margin, marginUnit, displayShadow, shadow, shadowHover, carouselHeight, imageFilter, lightboxCaption, carouselAlign, thumbnailColumns, thumbnailRatio, autoplay, speed, delay, loop, effect } = attributes;
		const hasImages = !! images.length;
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

		if ( ! hasImages ) {
			return (
				<Fragment>
					{ controls }
					{ mediaPlaceholder }
				</Fragment>
			);
		}
		const renderGalleryImages = ( img, index, thumbnail = false ) => {
			/* translators: %1$d is the order number of the image, %2$d is the total number of images. */
			const ariaLabel = sprintf( __( 'image %1$d of %2$d in gallery', 'kadence-blocks' ), ( index + 1 ), images.length );
			const ratio = ( thumbnail ? thumbnailRatio : imageRatio );
			return (
				<li className="swiper-slideee  " key={ img.id || img.url }>
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
							// onMoveBackward={ this.onMoveBackward( index ) }
							// onMoveForward={ this.onMoveForward( index ) }
							// onRemove={ this.onRemoveImage( index ) }
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
				</li>
			);
		};
		return (
			<div className={ `${ className } kb-gallery-container` } style={ {
				margin: ( undefined !== margin[ 0 ] && undefined !== margin[ 0 ].desk && '' !== margin[ 0 ].desk[ 0 ] ? margin[ 0 ].desk[ 0 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 1 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 2 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 3 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' : undefined ),
			} } >
				{ controls }
					<InspectorControls>
						<PanelBody title={__("Swiper Settings")}>
							<PanelRow>
								<RadioControl
									label="Auto Play"
									selected={autoplay}
									options={[
										{ label: "True", value: "true" },
										{ label: "False", value: "false" }
									]}
									onChange={option => {
										this.updateSliderSetting({ autoplay: option });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label="Delay"
									value={delay}
									onChange={option => {
										this.updateSliderSetting({ delay: option });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label="Speed"
									value={speed}
									onChange={option => {
										this.updateSliderSetting({ speed: option });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<RadioControl
									label="Loop"
									selected={loop}
									options={[
										{ label: "True", value: "true" },
										{ label: "False", value: "false" }
									]}
									onChange={option => {
										this.updateSliderSetting({ loop: option });
									}}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label="Effect"
									selected={effect}
									options={[
										{ label: "Slide", value: "slide" },
										{ label: "Fade", value: "fade" },
										{ label: "Cube", value: "cube" },
										{ label: "Coverflow", value: "coverflow" },
										{ label: "Flip", value: "flip" }
									]}
									onChange={option => {
										this.updateSliderSetting({ effect: option });
									}}
								/>
							</PanelRow>
						</PanelBody>
						
					</InspectorControls>
				{ noticeUI }
					<div id={ `kb-gallery-id-${ uniqueID }` } className={` swiper-containerr  `}>
						<div className={ `swiper-wrapperr ${ ( carouselAlign === false ? ' kb-carousel-mode-align-left' : '' ) }` }>
							{ images.length !== 1 && (

									images.map( ( img, index ) => {
										return renderGalleryImages( img, index );
									} ) 
								)
							}
							{ images.length === 1 && (
								images.map( ( img, index ) => {
									return renderGalleryImages( img, index );
								} )
							) }
						</div>
						<div class="swiper-pagination"></div>
					</div>
				
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
