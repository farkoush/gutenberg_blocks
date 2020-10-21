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
const { InnerBlocks } = wp.editor;
/**
 * Register block type.
 */
registerBlockType( 'hoora/swiper', {
	/**
	 * Block title.
	 *
	 * @type {string}
	 */
	title: "hoora Swiper",

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
			<div className="hoora-swiper">
				<InnerBlocks.Content />
			</div>
		);
	},
} );
