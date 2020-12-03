// (function() {
	
	// import './editor.scss';
	import Edit from "./edit";
	// import './editor.scss';
	// import Item from './item'
	// import { more } from '@wordpress/icons';
	const { registerBlockType } = wp.blocks;
	const { __ } = window.wp.i18n;
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

	export default registerBlockType( 'hoora/faqupdate', {
		title: __( 'FAQ Update', 'faq-block' ),
		// icon: 'welcome-learn-more',
		icon: 'heart',
		category: 'formatting', // (common, formatting, layout, widgets, embed)
		keywords: [ __( 'section' ), __( 'header' ) ],
		customClassName: false,
		parent: [ 'core/column' ],
		className: false,
		attributes,
		edit: Edit,
		save: ( props ) => {
			return(
				<div className="faq-container">
					<InnerBlocks.Content />
				</div>
			)
		},

	});

