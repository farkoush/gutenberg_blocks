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

	export default registerBlockType( 'hoora/faqitem', {
		title: __( 'FAQ Item', 'faq-block' ),
		// icon: 'welcome-learn-more',
		icon: 'heart',
		category: 'formatting', // (common, formatting, layout, widgets, embed)
		keywords: [ __( 'section' ), __( 'header' ) ],
		customClassName: false,
		parent: [ 'hoora/faq' ],
		className: false,
		attributes,
        edit: Edit,
        // edit : (props) => {
        //     <InnerBlocks
        //         // allowedBlocks={ [ 'core/image', 'core/paragraph' ] }
        //         template={[
        //             [ 'core/heading', {
        //                 customClasses: 'accordion',
        //                 placeholder: 'faq Heading'
        //             } ],
        //             [ 'hoora/section', {
        //                 customClasses: 'is-active',
        //             } ],
        //         ]}
        //     />
        // },
		save: ( props ) => {
			return(
				<div className="faq-container">
					<InnerBlocks.Content />
				</div>
			)
		},

	});

