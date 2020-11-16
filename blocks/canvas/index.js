/**
 * Block dependencies
 */
// import Edit from "./edit";
// import Save from "./save";
import MyCanvas from './MyCanvas'; // new!
/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register example block
 */
export default registerBlockType(
	'hoora/canvas',
	{
		title: 'canvas',
		description: 'An advanced Gutenberg Block that allows you to build an interactive Google Map.',
		category: 'common',
		icon: 'location-alt',
        attributes: {},

        edit(props) {
            return (
                <MyCanvas /> // instead of rewriting, we just use our component
            );
        },
    
        save(props) {
            return (
                <MyCanvas />
            );
        }
	},
);
