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
        const { attributes : {image,images, autoplay, loop, speed, delay, effect,titles,title}, setAttributes, className } = this.props;

		// function updateSliderSetting(event) {
		// 	const selected = event.target.querySelector(
		// 		"#hoora-carousel-loop-setting option:checked"
		// 	);
		// 	setAttributes({ loop: selected.value });
		// 	event.preventDefault();
		// }

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
						src={ image.url }
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
						console.log('titles' + title);
						return [
							<div class="media-row hoora-media-row pt-64">
								<PlainText
								    // onChange={ content => {var tt = []; tt.push(content); tt.map((t,index) => {return{id : index}}); setAttributes({title:content}); setAttributes({ titles : tt });  }}
                                    onChange={ content => {  setAttributes({title:content});   }}
									// onChange = {changedTitle => setAttributes({title:changedTitle})}
									value = { title }
                                    placeholder="Your card titleeeee"
                                    className="heading pb-64"
                                />
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
												{/* test */}
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
						<PlainText
							onChange={ content => {  setAttributes({title:content});   }}
							value = { title }
							placeholder = "Your card title"
							className = "heading pb-64"
						/>
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
