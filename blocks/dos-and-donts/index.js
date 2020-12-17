/**
 * Do's and don'ts block.
 *
 * @package
 */

/**
 * Internal dependencies.
 */
import Edit from './edit';

/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
// import { registerBlockType } from '@wordpress/blocks';
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;
/**
 * Register block type.
 */
registerBlockType( 'aquila-blocks/dos-and-donts', {
	/**
	 * Block title.
	 *
	 * @type {string}
	 */
	title: "Dos and dont's",

	/**
	 * Block icon.
	 *
	 * @type {string}
	 */
	icon: 'editor-table',

	/**
	 * Block description.
	 *
	 * @type {string}
	 */
	description: __( 'Add headings and text', 'aquila' ),

	/**
	 * Block category.
	 *
	 * @type {string}
	 */
	category: 'aquila',

	edit: Edit,

	/**
	 * Save
	 *
	 * @return {Object} Save content.
	 */
	save() {
		return (
			<div className="aquila-dos-and-donts">
				<InnerBlocks.Content />
			</div>
		);
	},
} );
