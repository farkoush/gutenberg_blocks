/**
 * BLOCK: Gutenberg Repeater Field
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import Edit from "./edit";
import save from "./save";

const {
	__,
} = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

/**
 * Register: Repeater Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'grf/gutenberg-repeater-field', {
	title: __( 'Gutenberg Repeater Field' ),
	icon: 'shield',
	category: 'common',
	attributes: {
		locations: {
			type: 'array',
			default: [],
			// source: 'query',
			// query:{
			// 	address:{
			// 		type: 'string',
			// 		source: 'text',
			// 		default: ''
			// 	}
			// }
		},
	},
	keywords: [
		__( 'Gutenberg Repeater Field' ),
		__( 'Repeatable' ),
		__( 'ACF' ),
	],
	edit: Edit,
	save: save,
} );
