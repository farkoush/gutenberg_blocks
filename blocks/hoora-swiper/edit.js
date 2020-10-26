/**
 * Internal block libraries
 */
const { __ } = wp.i18n; 
const { Component, Fragment } = wp.element;

const {
	MediaUpload,
	MediaPlaceholder,
	MediaUploadCheck,
    InspectorControls,
    RichText,
    PlainText
} = wp.blockEditor;
const {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	SelectControl,
	RadioControl
} = wp.components;


export default class Edit extends Component {
    constructor() {
        super( ...arguments );
    }
    
    render() {
        const { attributes : {imageID, imageAlt, imageUrl,images, autoplay, loop, speed, delay, effect,titles, body}, setAttributes, className } = this.props;

		// function updateSliderSetting(event) {
		// 	const selected = event.target.querySelector(
		// 		"#hoora-carousel-loop-setting option:checked"
		// 	);
		// 	setAttributes({ loop: selected.value });
		// 	event.preventDefault();
		// }

		const onSelectImage1 = img => {
			setAttributes( {
				imageID: img.id,
				imageUrl: img.url,
				imageAlt: img.alt,
			} );
		};
		const getImageButton = (openEvent) => {
			if(imageUrl) {
				return (
					<img
						src={ imageUrl }
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

		function updateSliderSetting(value) {
			setAttributes(value);
		}

		function removeImage(removeImg, currentImages) {
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

		function addImage(selectedImage, selectedImages, selectedImageIndex) {
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
		// need to update the specific attribute image with this image
		const onSelectImage = function(
			selectedImage,
			selectedImages,
			selectedImageIndex
		) {
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
		const onSelectImages = function(selectedImages) {
			const updatedImages = selectedImages.map((img, index) => {
				// console.log(selectedImages);
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
                                <PlainText
                                    onChange={ content => setAttributes({ titles : content }) }
                                    value={ titles }
                                    placeholder="Your card title"
                                    className="heading"
                                />
                                {/* <RichText
                                    onChange={ content => setAttributes({ body: content }) }
                                    value={ body }
                                    multiline="p"
                                    placeholder="Your card text"
                                /> */}
							</div>
						];
					})}
				</Fragment>
			];
		} else {
			return (
				<Fragment>
					<div className={className}>
						{/* <MediaPlaceholder
							icon="format-gallery"
							className={className}
							labels={{
								title: __("Carousel"),
								name: __("images")
							}}
							onSelect={onSelectImages}
							accept="image/*"
							type="image"
							multiple
						/> */}
						<MediaUploadCheck>
                            <MediaUpload
                                onSelect={ onSelectImage1 }
                                allowedTypes={ ['image'] }
                                // allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ imageID }
								render={({ open }) => getImageButton(open) }
								// render={({ open }) => (
								// 	<Button className={"image-button"} onClick={open}>
								// 		<img src={imageUrl} />
								// 		test
								// 	</Button>
								// )}
                            />
                        </MediaUploadCheck>
					</div>
				</Fragment>
			);
		}
    }
}
