/**
 * External dependencies
 */
 import { get, pick } from 'lodash';

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
	MediaUploadCheck,
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
import attributes from './attributes';

/**
 * This allows for checking to see if the block needs to generate a new ID.
 */
 const typeOptions = [
	{ value: 'masonry', label: __( 'Masonry', 'kadence-blocks' ), icon: icons.galMasonry, isDisabled: false },
	{ value: 'carousel', label: __( 'Carousel', 'kadence-blocks' ), icon: icons.galCarousel, isDisabled: false },
	{ value: 'slider', label: __( 'Slider', 'kadence-blocks' ), icon: icons.galSlider, isDisabled: false },
];

const kbGalleryUniqueIDs = [];

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class GalleryEdit extends Component {
	constructor() {
		super( ...arguments );
				this.onSelectImage = this.onSelectImage.bind( this );
		this.onSelectImages = this.onSelectImages.bind( this );
		this.setAttributesss = this.setAttributesss.bind( this );
		this.onMove = this.onMove.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBackward = this.onMoveBackward.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );

		this.state = {
			selectedImage: null,
			imageAttributes: {},
			// settings: {},
			// marginDeskControl: 'linked',
			// marginTabletControl: 'linked',
			// marginMobileControl: 'linked',
			// radiusControl: 'linked',
			// user: ( kadence_blocks_params.userrole ? kadence_blocks_params.userrole : 'admin' ),
		};
	}
	
	updateSliderSetting (event) {
		const selected = event.target.querySelector(
			"#hoora-carousel-loop-setting option:checked"
		);
		this.props.setAttributes({ loop: selected.value });
		event.preventDefault();
	}
	 updateSliderSetting (value) {
		this.props.setAttributes(value);
	}

	setAttributesss( attributesss ) {
		if ( attributesss.ids ) {
			throw new Error( 'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes' );
		}
		console.log('attributesss.images');
		console.log(attributesss.images);
		if ( attributesss.images ) {
			attributesss = {
				...attributesss,
				ids: map( attributesss.images, 'id' ),
			};
		}
		console.log('attributesss.ids');
		console.log(attributesss.ids);
		this.props.setAttributes( {images: attributesss.images} );
		this.props.setAttributes( {ids: attributesss.ids} );
		console.log('this.props.attributes.images');
		// console.log(this.props.attributes);
		console.log(this.props.attributes.images);
	}


	// onRemoveImage( index ) {
	// 	return () => {
	// 		const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
	// 		this.setState( { selectedImage: null } );
	// 		this.setAttributes( {
	// 			images,
	// 		} );
	// 	};
	// }
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
		this.setAttributesss( { images } );
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
			this.setAttributesss( {
				images,
			} );
		};
	}
	onSelectImages( imgs ) {
		const { lightSize, thumbSize, images } = this.props.attributes;
		this.setAttributesss( {
			images: imgs.map( ( image ) => pickRelevantMediaFiles( image, lightSize, thumbSize, images ) ),
		} );
	}
	onSelectImages1( imgs ) {
		const { lightSize, thumbSize, images } = this.props.attributes;
		this.setAttributesss( {
			// images: imgs.map( ( image ) => pickRelevantMediaFiles( image, lightSize, thumbSize, images ) ),
			// images:imgs.map( (image) => pick( image, [ 'alt', 'id', 'link', 'caption' ] ) )
			images:imgs.map( (image) => pick( image, [ 'id','url','thumbUrl','alt','caption' ] ) )
		} );
		// const updatedImages11 = imgs.map( (image) => pick( image, [ id,url,thumbUrl,alt,caption ] ) )
		// const updatedImages = imgs.map(img => {
		// 		console.log('imagePropssss');
		// 		const imageProps = pick( img, [ 'alt', 'id', 'link', 'caption' ] );
		// 		console.log(imageProps);
		// 		return {
		// 			id: img.id,
		// 			url: img.url,
		// 			thumbUrl: img.url,
		// 			alt: img.alt,
		// 			caption: img.caption
		// 		};
		// });
		// console.log('updatedImagesssss11');
		// console.log(updatedImages11);
	}

	onUploadError( message ) {
		const { noticeOperations } = this.props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	}

	render() {
		const { attributes, isSelected, className, noticeUI, setAttributes } = this.props;
		const { uniqueID, images, columns, linkTo, ids, type, autoplay, speed, delay, loop, effect } = attributes;
		const galleryTypes = applyFilters( 'kadence.galleryTypes', typeOptions );
		// const hasImages = true;
		console.log('images.length');
		console.log(images.length)
		console.log('ids')
		console.log(ids)
		const hasImages = !! images.length;
		const controls = (
			<BlockControls>
				{ hasImages && (
					<Toolbar>
						<MediaUpload
							// onSelect={ onSelectImages }
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
			return (
				// <li className="swiper-slideee blocks-gallery-item " key={ img.id || img.url }>
				// 		<img 
				// 			data-id = {img.id}
				// 			src={ img.thumbUrl || img.url }
				// 			// src={ thumbUrl || url }
				// 			alt={ img.alt }
				// 			// width={ img.width }
				// 			// height={ img.height }
				// 			data-id={ img.id }
				// 			data-full-image={ img.url }
				// 			data-light-image={ img.lightUrl }
				// 			data-link={ img.link }
				// 			// data-custom-link={ img.customLink }
				// 			// data-custom-link-target={ img.linkTarget }
				// 		/>
				// </li>
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
		const typeLabel = galleryTypes.filter( ( item ) => ( item.value === type ) );
			return (
				<Fragment>
					<div className={ `${ className } kb-gallery-container` } style={ {
					} } >
						{ controls }
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
									{ type && ( type === 'carousel' || type === 'grid' || type === 'masonry' ) && (
										<Fragment>
										</Fragment>
									) }
								</PanelBody>
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
						{console.log('images')}
						{console.log(images)}
							<div id={ `kb-gallery-id-${ uniqueID }` } className={` swiper-containerr  `}>
								<div className={ `swiper-wrapperr `}>
									{ images.length !== 1 && (
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
				</Fragment>
			);
		}
	}
// }
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
