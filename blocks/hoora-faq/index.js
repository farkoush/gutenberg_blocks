// (function() {
	
	// import './editor.scss';
	import Edit from "./edit";
	import './editor.scss';
	import { more } from '@wordpress/icons';
	const { registerBlockType } = wp.blocks;
	const { Component } = wp.element;
	const {  Panel, PanelBody,PanelRow,TextControl,RangeControl, Button } = wp.components;
	const { createElement } = wp.element;
	const { __ } = window.wp.i18n;
	const { InspectorControls, RichText,InnerBlocks } = wp.blockEditor;



	const attributes = {
		question: {
			source: 'children',
			selector: '.meow-faq-question',
			default: 'Question...'
		},
		answer: {
			source: 'children',
			selector: '.meow-tab-content',
			default: 'Answer...'
		},
		// hash: {
		// 	source: 'attribute',
		// 	attribute: 'id',
		// 	selector: 'input',
		// 	default: ''
		// }
	}

	export default registerBlockType( 'hoora/faq', {
		title: __( 'FAQ', 'faq-block' ),
		// icon: 'welcome-learn-more',
		icon: 'heart',
		category: 'formatting', // (common, formatting, layout, widgets, embed)
		keywords: [ __( 'section' ), __( 'header' ) ],
		customClassName: false,
		className: false,
		attributes,
		edit: Edit,
		save: ( props ) => {
			return(
				<div>save</div>
			)
			// const question = props.attributes.question;
			// const answer = props.attributes.answer;
			// const hash = props.attributes.hash;

			// let container = (
			// 	<div className='meow-faq-block'>
			// 		<input type='checkbox' id={hash} name={hash} />
			// 		<RichText.Content className='meow-faq-question' tagName='label' value={question} htmlFor={hash} />
			// 		<div className='meow-tab-answer'>
			// 			<RichText.Content className='meow-tab-content' tagName='div' value={answer} />
			// 		</div>
			// 	</div>
			// );
			// return container;
		},

	});

// })();
