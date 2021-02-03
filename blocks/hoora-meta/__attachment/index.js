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
};

registerBlockType("hoora/attachment", {
	title: "hoora attachment", 
	icon: "images-alt2", 
	category: "hoora", 
	attributes,

	edit:Edit,

	save: ({attributes}) => {
		return (
				<div className="">
					{attributes.images.map((image, index) => {
						return (
							<div className="">
								<img src={image.url} alt={image.alt} />
							</div>
						);
					})}
				</div>
		);
	}
});