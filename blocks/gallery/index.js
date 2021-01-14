// import "./style.scss";
// import "./editor.scss";
import Edit from './edit';

const { registerBlockType } = wp.blocks;

const attributes = {
	image: {
		type: 'object',
		default: {}
	},
    images: {
		type: "array",
		default: []
	},
	autoplay: {
		type: "string",
		default: "true"
	},
	speed: {
		type: "string",
		default: "500"
	},
	delay: {
		type: "string",
		default: "5000"
	},
	loop: {
		type: "string",
		default: "true"
	},
	effect: {
		type: "string",
		default: "slide"
	}
};

registerBlockType("hoora/gallery", {
	title: "hoora gallery", 
	icon: "images-alt2", 
	category: "hoora", 
	attributes,

	edit:Edit,

	save: function(props) {
		const { image,images, autoplay, loop, speed, delay, effect } = props.attributes;
		return (
			<div
				className={`swiper-container hoora-swiper-container hoora-swiper-container`}
				data-autoplay={autoplay}
				data-delay={delay}
				data-loop={loop}
				data-speed={speed}
				data-effect={effect}
			>
				<div className="swiper-wrapper hoora-swiper-wrapper">
					{images.map((image, index) => {
						return (
							<div className="swiper-slide hoora-swiper-slide">
								<img src={image.url} alt={image.alt} />
							</div>
						);
					})}
				</div>
				<div className="swiper-pagination hoora-swiper-pagination" />
				<div className="hoora-swiper-button-prev swiper-button-prev hoora-swiper-button-prev" />
				<div className="hoora-swiper-button-next swiper-button-next hoora-swiper-button-next" />
			</div>
		);
	}
});