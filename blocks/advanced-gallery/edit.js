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

		// this.onSelectImage = this.onSelectImage.bind( this );
		// this.onSelectImages = this.onSelectImages.bind( this );
		// this.setCaptions = this.setCaptions.bind( this );
		// this.onUploadError = this.onUploadError.bind( this );
		// this.setImageAttributes = this.setImageAttributes.bind( this );
		// this.setAttributes = this.setAttributes.bind( this );

		// this.state = {
		// 	selectedImage: null,
		// 	imageAttributes: {},
		// 	settings: {},
		// 	marginDeskControl: 'linked',
		// 	marginTabletControl: 'linked',
		// 	marginMobileControl: 'linked',
		// 	radiusControl: 'linked',
		// };
	}
	
	updateSliderSetting (event) {
		const selected = event.target.querySelector(
			"#hoora-carousel-loop-setting option:checked"
		);
		this.setAttributes({ loop: selected.value });
		event.preventDefault();
	}
	 updateSliderSetting (value) {
		this.setAttributes(value);
	}

	// setAttributes( attributes ) {
	// 	if ( attributes.ids ) {
	// 		throw new Error( 'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes' );
	// 	}

	// 	if ( attributes.images ) {
	// 		attributes = {
	// 			...attributes,
	// 			ids: map( attributes.images, 'id' ),
	// 		};
	// 	}

	// 	this.props.setAttributes( attributes );
	// }

	// onSelectImage( index ) {
	// 	return () => {
	// 		if ( this.state.selectedImage !== index ) {
	// 			this.setState( {
	// 				selectedImage: index,
	// 			} );
	// 		}
	// 	};
	// }

	// onRemoveImage( index ) {
	// 	return () => {
	// 		const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
	// 		this.setState( { selectedImage: null } );
	// 		this.setAttributes( {
	// 			images,
	// 		} );
	// 	};
	// }

	// onSelectImages( imgs ) {
	// 	const { lightSize, thumbSize, images } = this.props.attributes;
	// 	this.setAttributes( {
	// 		images: imgs.map( ( image ) => pickRelevantMediaFiles( image, lightSize, thumbSize, images ) ),
	// 	} );
	// }

	// onUploadError( message ) {
	// 	const { noticeOperations } = this.props;
	// 	noticeOperations.removeAllNotices();
	// 	noticeOperations.createErrorNotice( message );
	// }

	// setCaptions( value ) {
	// 	this.setAttributes( { showCaption: value } );
	// 	if ( value ) {
	// 		const { lightSize, thumbSize, images } = this.props.attributes;
	// 		if ( images ) {
	// 			this.setAttributes( {
	// 				images: images.map( ( image ) => pickRelevantMediaFilesUpdate( image, lightSize, thumbSize ) ),
	// 			} );
	// 		}
	// 	}
	// }

	// setImageAttributes( index, attributes ) {
	// 	const { attributes: { images } } = this.props;
	// 	const { setAttributes } = this;
	// 	if ( ! images[ index ] ) {
	// 		return;
	// 	}
	// 	if ( images[ index ].id ) {
	// 		this.saveImageAttributes( images[ index ].id, attributes );
	// 	}
	// 	setAttributes( {
	// 		images: [
	// 			...images.slice( 0, index ),
	// 			{
	// 				...images[ index ],
	// 				...attributes,
	// 			},
	// 			...images.slice( index + 1 ),
	// 		],
	// 	} );
	// }
	// setLinkAttributes( index, attributes ) {
	// 	const { attributes: { images } } = this.props;
	// 	const { setAttributes } = this;
	// 	if ( ! images[ index ] ) {
	// 		return;
	// 	}
	// 	setAttributes( {
	// 		images: [
	// 			...images.slice( 0, index ),
	// 			{
	// 				...images[ index ],
	// 				...attributes,
	// 			},
	// 			...images.slice( index + 1 ),
	// 		],
	// 	} );
	// }
	// componentDidMount() {
	// 	const { attributes, mediaUpload } = this.props;
	// 	const { images, uniqueID } = attributes;
	// 	if ( ! uniqueID ) {
	// 		this.props.setAttributes( {
	// 			uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
	// 		} );
	// 		kbGalleryUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
	// 	} else if ( kbGalleryUniqueIDs.includes( uniqueID ) ) {
	// 		this.props.setAttributes( {
	// 			uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
	// 		} );
	// 		kbGalleryUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
	// 	} else {
	// 		kbGalleryUniqueIDs.push( uniqueID );
	// 	}
	// 	// if ( every( images, ( { url } ) => isBlobURL( url ) ) ) {
	// 	// 	const filesList = map( images, ( { url } ) => getBlobByURL( url ) );
	// 	// 	forEach( images, ( { url } ) => revokeBlobURL( url ) );
	// 	// 	mediaUpload( {
	// 	// 		filesList,
	// 	// 		onFileChange: this.onSelectImages,
	// 	// 		allowedTypes: [ 'image' ],
	// 	// 	} );
	// 	// }
	// }

	// componentDidUpdate( prevProps ) {
	// 	// Deselect images when deselecting the block
	// 	if ( ! this.props.isSelected && prevProps.isSelected ) {
	// 		this.setState( {
	// 			selectedImage: null,
	// 			captionSelected: false,
	// 		} );
	// 	}
	// }
	render() {
		const { attributes, isSelected, className, noticeUI, setAttributes } = this.props;
		const { uniqueID, images, columns, linkTo, ids, columnControl, showCaption, captionStyles, type, imageRatio, captionStyle, gutter, thumbSize, autoSpeed, transSpeed, slidesScroll, arrowStyle, dotStyle, imageRadius, margin, marginUnit, displayShadow, shadow, shadowHover, carouselHeight, imageFilter, lightboxCaption, carouselAlign, thumbnailColumns, thumbnailRatio, autoplay, speed, delay, loop, effect } = attributes;
		const galleryTypes = applyFilters( 'kadence.galleryTypes', typeOptions );
		const hasImages = true;
		// const hasImages = !! images.length;
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
		console.log('hasImages');
		console.log(hasImages);

	
		
		const removeImage=(removeImg, currentImages) => {
			// Filter out the image we're deleting
			const filterImages = currentImages.filter(img => img.id != removeImg.id);
			// Reset the ID's to the new index
			const updatedImages = filterImages.map((img, index) => {
				if (img.id != removeImg.id) {
					return {
						id: index,
						imgid: img.imgid,
						url: img.url,
						thumbnailUrl: img.thumbnailUrl,
						alt: img.alt,
						caption: img.caption
					};
				}
			});
			setAttributes({
				images: updatedImages
			});
		}
	
		const addImage=(selectedImage, selectedImages, selectedImageIndex) => {
			const updatedImage = {
				id: selectedImageIndex,
				imgid: selectedImage.id,
				url: selectedImage.sizes.full.url,
				thumbnailUrl: selectedImage.sizes.thumbnail.url,
				alt: selectedImage.alt,
				caption: selectedImage.caption
			};
			// Insert our new image into the array after the current index.
			selectedImages.splice(selectedImageIndex + 1, 0, updatedImage);
			const updatedImages = selectedImages.map((img, index) => {
				return {
					id: index,
					imgid: img.id,
					url: img.url,
					thumbnailUrl: img.thumbnailUrl,
					alt: img.alt,
					caption: img.caption
				};
			});
	
			setAttributes({
				images: updatedImages
			});
		}
	
		// Replace the image with the new selected one
		// need to update the specific attribute image with this iamge
		const onSelectImage = (
			selectedImage,
			selectedImages,
			selectedImageIndex
		) => {
			const updatedImages = selectedImages.map(img => {
				if (img.id === selectedImageIndex) {
					return {
						id: selectedImageIndex,
						imgid: selectedImage.id,
						url: selectedImage.sizes.full.url,
						thumbnailUrl: selectedImage.sizes.thumbnail.url,
						alt: selectedImage.alt,
						caption: selectedImage.caption
					};
				} else {
					return img;
				}
			});
			setAttributes({
				images: updatedImages
			});
		};
	
		// Add an id to the array of selected images and update the img attribute
		const onSelectImages =  (selectedImages) => {
			const updatedImages = selectedImages.map((img, index) => {
				return {
					id: index,
					imgid: img.id,
					url: img.sizes.full.url,
					thumbnailUrl: img.sizes.thumbnail.url,
					alt: img.alt,
					caption: img.caption
				};
			});
			setAttributes({
				images: updatedImages
			});
		};
		
		// if ( ! hasImages ) {
		// 	return (
		// 		<Fragment>
		// 			{ controls }
		// 			{ mediaPlaceholder }
		// 		</Fragment>
		// 	);
		// }
		const renderGalleryImages = ( img, index, thumbnail = false ) => {
			/* translators: %1$d is the order number of the image, %2$d is the total number of images. */
			const ariaLabel = sprintf( __( 'image %1$d of %2$d in gallery', 'kadence-blocks' ), ( index + 1 ), images.length );
			const ratio = ( thumbnail ? thumbnailRatio : imageRatio );
			return (
				<li className="swiper-slideee  " key={ img.id || img.url }>
						<img src={ img.thumbUrl || img.url }/>
				</li>
			);
		};
		const typeLabel = galleryTypes.filter( ( item ) => ( item.value === type ) );


		if (images.length > 0) {
			return [
				<InspectorControls>
					<PanelBody title={__("Carousel Settings")}>
						<PanelRow>
							<RadioControl
								label="Auto Play"
								selected={autoplay}
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
								value={delay}
								onChange={option => {
									updateSliderSetting({ delay: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Speed"
								value={speed}
								onChange={option => {
									updateSliderSetting({ speed: option });
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
									updateSliderSetting({ loop: option });
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
									updateSliderSetting({ effect: option });
								}}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>,
				<Fragment>
					{images.map((img, imgMapIndex) => {
						return [
							<div class="media-row hoora-media-row">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={selectedImg =>
											onSelectImage(selectedImg, images, imgMapIndex)
										}
										type="image"
										value={img.imgid}
										accept="image/*"
										type="image"
										className=""
										render={({ open }) => (
											<Button className={"image-button"} onClick={open}>
												<img src={img.url} />
											</Button>
										)}
									/>
									<div className="hoora-media-row--delete-button">
										<Button
											className={"button button-large"}
											onClick={() => {
												removeImage(img, images);
											}}
										>
											X
										</Button>
									</div>
									<div className="hoora-media-row--add-button">
										<MediaUpload
											onSelect={selectedImage =>
												addImage(selectedImage, images, imgMapIndex)
											}
											type="image"
											accept="image/*"
											type="image"
											render={({ open }) => (
												<Button
													className={"button button-large"}
													onClick={open}
												>
													Add Image
												</Button>
											)}
										/>
									</div>
								</MediaUploadCheck>
							</div>
						];
					})}
				</Fragment>
			];
		} else {
			return (
				<Fragment>
					{/* <div className={props.className}> */}
						<MediaPlaceholder
							icon="format-gallery"
							// className={props.className}
							labels={{
								title: __("Carousel"),
								name: __("images")
							}}
							onSelect={ onSelectImages }
							accept="image/*"
							type="image"
							multiple
						/>
					{/* </div> */}
				</Fragment>
			);
		}
	}





		// return (
		// 	<div className={ `${ className } kb-gallery-container` } style={ {
		// 		margin: ( undefined !== margin[ 0 ] && undefined !== margin[ 0 ].desk && '' !== margin[ 0 ].desk[ 0 ] ? margin[ 0 ].desk[ 0 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 1 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 2 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' + margin[ 0 ].desk[ 3 ] + ( undefined !== marginUnit ? marginUnit : 'px' ) + ' ' : undefined ),
		// 	} } >
		// 		{ controls }
		// 			<InspectorControls>
		// 				<PanelBody title={ __( 'Gallery Settings', 'kadence-blocks' ) }>
		// 					<h2>{ __( 'Gallery Type:' ) + ' ' + ( undefined !== typeLabel && undefined !== typeLabel[ 0 ] && typeLabel[ 0 ].label ? typeLabel[ 0 ].label : 'Masonry' ) }</h2>
		// 					<ButtonGroup className="kt-style-btn-group kb-gallery-type-select" aria-label={ __( 'Gallery Type', 'kadence-blocks' ) }>
		// 						{ map( galleryTypes, ( { value, label, icon, isDisabled } ) => (
		// 							<Tooltip text={ label }>
		// 								<Button
		// 									key={ value }
		// 									className={ `kt-style-btn${ ( isDisabled ? ' kb-disabled-btn' : '' ) }` }
		// 									isSmall
		// 									isDisabled={ isDisabled }
		// 									isPrimary={ type === value }
		// 									aria-pressed={ type === value }
		// 									onClick={ () => {
		// 										if ( ! isDisabled ) {
		// 											setAttributes( { type: value } );
		// 										}
		// 									} }
		// 								>
		// 									{ icon }
		// 								</Button>
		// 							</Tooltip>
		// 						) ) }
		// 					</ButtonGroup>
		// 					{ type && ( type === 'carousel' || type === 'grid' || type === 'masonry' ) && (
		// 						<Fragment>
		// 						</Fragment>
		// 					) }
		// 				</PanelBody>
		// 				<PanelBody title={__("Swiper Settings")}>
		// 					<PanelRow>
		// 						<RadioControl
		// 							label="Auto Play"
		// 							selected={autoplay}
		// 							options={[
		// 								{ label: "True", value: "true" },
		// 								{ label: "False", value: "false" }
		// 							]}
		// 							onChange={option => {
		// 				updateSliderSetting({ autoplay: option });
		// 							}}
		// 						/>
		// 					</PanelRow>
		// 					<PanelRow>
		// 						<TextControl
		// 							label="Delay"
		// 							value={delay}
		// 							onChange={option => {
		// 								this.updateSliderSetting({ delay: option });
		// 							}}
		// 						/>
		// 					</PanelRow>
		// 					<PanelRow>
		// 						<TextControl
		// 							label="Speed"
		// 							value={speed}
		// 							onChange={option => {
		// 								this.updateSliderSetting({ speed: option });
		// 							}}
		// 						/>
		// 					</PanelRow>
		// 					<PanelRow>
		// 						<RadioControl
		// 							label="Loop"
		// 							selected={loop}
		// 							options={[
		// 								{ label: "True", value: "true" },
		// 								{ label: "False", value: "false" }
		// 							]}
		// 							onChange={option => {
		// 								this.updateSliderSetting({ loop: option });
		// 							}}
		// 						/>
		// 					</PanelRow>
		// 					<PanelRow>
		// 						<SelectControl
		// 							label="Effect"
		// 							selected={effect}
		// 							options={[
		// 								{ label: "Slide", value: "slide" },
		// 								{ label: "Fade", value: "fade" },
		// 								{ label: "Cube", value: "cube" },
		// 								{ label: "Coverflow", value: "coverflow" },
		// 								{ label: "Flip", value: "flip" }
		// 							]}
		// 							onChange={option => {
		// 								this.updateSliderSetting({ effect: option });
		// 							}}
		// 						/>
		// 					</PanelRow>
		// 				</PanelBody>
						
		// 			</InspectorControls>
		// 		{ noticeUI }
		// 			<div id={ `kb-gallery-id-${ uniqueID }` } className={` swiper-containerr  `}>
		// 				<div className={ `swiper-wrapperr ${ ( carouselAlign === false ? ' kb-carousel-mode-align-left' : '' ) }` }>
		// 					{ images.length === 1 && (
		// 						images.map( ( img, index ) => {
		// 							return renderGalleryImages( img, index );
		// 						} )
		// 					) }
		// 				</div>
		// 				<div class="swiper-pagination"></div>
		// 			</div>
				
		// 		{ isSelected && (
		// 			mediaPlaceholder
		// 		) }
		// 	</div>
		// );
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
