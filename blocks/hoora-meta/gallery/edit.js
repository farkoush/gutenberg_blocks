/**
 * Internal block libraries
 */
const { __ } = wp.i18n; 
const { Component, Fragment } = wp.element;

const {
	MediaUpload,
	MediaPlaceholder,
	MediaUploadCheck,
	InspectorControls
} = wp.editor;
const {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	SelectControl,
	RadioControl
} = wp.components;


export default class Edit extends Component {  
    render() {
        const { attributes : {image,images}, setAttributes, className } = this.props;
		const onSelectImage1 = img => {
			console.log(img.id);
			var selectImages = [];
			var selectedImage = img;
			selectImages.push(img);
			const updatedImages = selectImages.map(img => {
				return {
				// id: selectedImageIndex,
				id: img.id,
				imgid: selectedImage.id,
				url: selectedImage.sizes.full.url,
				thumbnailUrl: selectedImage.sizes.thumbnail.url,
				alt: selectedImage.alt,
				caption: selectedImage.caption
			};
		});
			setAttributes({
				images: updatedImages
			});
		};
		const getImageButton = (openEvent) => {
			if(image.url) {
				return (
					<img
						src={ image.thumbnailUrl }
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

		if (images.length > 0) {
			return [
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
												<img src={img.thumbnailUrl} />
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
								value={ image.id }
								render={({ open }) => getImageButton(open) }
                            />
                        </MediaUploadCheck>
					</div>
				</Fragment>
			);
		}
    }
}