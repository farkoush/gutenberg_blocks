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

/**
 * Register example block
 */
export default registerBlockType(
	'hoora/google-map2',
	{
		title: 'Google Map Block22',
		description: 'An advanced Gutenberg Block that allows you to build an interactive Google Map.',
		category: 'common',
		icon: 'location-alt',
		attributes: {
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
			mapObj:{
				type:'object',
				default:{}
			}
		},
		edit:Edit,
		// save() {
		// 	return null;
		// },
		// save:Save,
		save: (props) => {
			const { className } = props;
			const { lat, lng,zoom,height } = props.attributes;
	
			const data = {
				lat, lng,zoom,height
			};
			return (
				// <div class="wp-block-webfactory-map"><iframe width='100%' height= '500px' src={'https://www.google.com/maps/embed/v1/place?q=' + encodeURIComponent('Theater District, New York, USA') + '&maptype=roadmap&zoom=12&key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g'} frameBorder='0'></iframe></div>
				// <div id="map" style={{  height: 500 }}>'Check the meta' </div>
				<div
					id="map" style={{  height: 500 }}
					className={className}
					data-react-props={JSON.stringify(data)} 
				/>
			);
		},
	},
);
