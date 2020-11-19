/**
 * Block dependencies
 */
import Edit from "./edit";
// import Save from "./save";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const attributes = {
	// center: {
	//     type: "array",
	//     default:[
	//         {
	//             lat: 23.7806365,
	//             lng: 90.4193257,
	//         }
	//     ]
	// },
	lat: {
		type: 'number',
		default: 35.700700
	},
	lng: {
		type: 'number',
		default: 51.397783,
	}, 
	zoom: {
		type: 'number',
		default: 17,
	},
	height: {
		type: 'number',
		default: 500,
	},
	image: {
		type: 'object',
		default: {}
	}
}
/**
 * Register example block
 */
export default registerBlockType(
	'hoora/google-map',
	{
		title: 'Google Map Block',
		description: 'An advanced Gutenberg Block that allows you to build an interactive Google Map.',
		category: 'common',
		icon: 'location-alt',
		attributes,
		edit:Edit,
		save: (props) => {
			const { className } = props;
			const { lat, lng, zoom, height } = props.attributes;
	
			const data = {
				lat, lng,zoom,height
			};
			return (
				<div
					id="map" style={{  height }} //height = attributes.height
					className={className}
					data-react-props={JSON.stringify(data)} 
				/>
			);
		},
	},
);
