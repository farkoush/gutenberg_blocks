/**
 * WordPress Dependencies.
 */
// import { InnerBlocks } from '@wordpress/block-editor';
const {
	InnerBlocks,
} = wp.editor;
import { blockColumns } from './templates';
const {  TabPanel } = wp.components;

const INNER_BLOCKS_TEMPLATE = [
	[
		'core/group',
		{
			className: 'hoora-swiper__group',
			backgroundColor: 'pale-cyan-blue',
		},
		blockColumns,
	],
];

const ALLOWED_BLOCKS = [ 'core/group' ];

/**
 * Edit function.
 *
 * @return {Object} Content.
 */
const Edit = () => {
	return (
		<div>
			<InnerBlocks
				template={ INNER_BLOCKS_TEMPLATE }
				allowedBlocks={ ALLOWED_BLOCKS }
				templateLock={ true }
			/>
		</div>			
	);
};

export default Edit;
