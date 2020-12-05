// (function() {
	// import './editor.scss';
	import Edit from "./edit";
	// import './editor.scss';
	// import Item from './item'
	// import { more } from '@wordpress/icons';
	const { registerBlockType } = wp.blocks;
	// const { __ } = window.wp.i18n;
	const { InnerBlocks } = wp.blockEditor;

	const attributes = {
		question: {
			type: 'string',
			default: 'Question...',
		},   
		answer: {
			type: 'string',
			default: 'Answer...',
		},   
	}

	export default registerBlockType( 'hoora/faq', {
		title: 'Hoora FAQ',
		// icon: 'welcome-learn-more',
		icon: 'heart',
		category: 'hoora', // (common, formatting, layout, widgets, embed)
		// keywords: [ __( 'section' ), __( 'header' ) ],
		customClassName: false,
		// parent: [ 'hoora/column' ],
		className: false,
		attributes,
		// edit : () => {
		// 	return(
		// 		<div>Edit</div>
		// 	)
		// },
		edit: Edit,
		save: ( props ) => {
			return(
				// <div>
				// 	save
				// </div>
				<div className="faq-container">
					<InnerBlocks.Content />
				</div>
			)
		},

	});

