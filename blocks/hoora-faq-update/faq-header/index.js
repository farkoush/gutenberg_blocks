// (function() {
	
	// import './editor.scss';
	import Edit from "./edit";
	import './editor.scss';
	import Item from './item'
	import { more } from '@wordpress/icons';
	const { registerBlockType } = wp.blocks;
	const { Component } = wp.element;
	const {  Panel, PanelBody,PanelRow,TextControl,RangeControl, Button } = wp.components;
	const { createElement } = wp.element;
	const { __ } = window.wp.i18n;
	const { InspectorControls, RichText,InnerBlocks } = wp.blockEditor;



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

	export default registerBlockType( 'hoora/faqheader', {
		title: __( 'FAQ header', 'faq-block' ),
		// icon: 'welcome-learn-more',
		icon: 'heart',
		category: 'formatting', // (common, formatting, layout, widgets, embed)
		keywords: [ __( 'section' ), __( 'header' ) ],
		customClassName: false,
        className: false,
        parent: [ 'hoora/faqupdate' ],
		attributes,
		edit: Edit,
		save: ( props ) => {
			const { attributes } = props;
			return(
				<div className="faq-container">
            		{/* <Item header={attributes.question} body={attributes.answer}/> */}
                    <InnerBlocks.Content />
				</div>
			)
		},

	});

// })();
