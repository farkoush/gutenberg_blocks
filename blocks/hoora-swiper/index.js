import "./style.scss";
import "./editor.scss";
// import Edit from './edit';
// import './editor.scss';
// import './style.scss';
import Edit from "./edit";
import save from "./save";
const { registerBlockType } = wp.blocks;
var el = wp.element.createElement;

const { __ } = wp.i18n; 
const { Component, Fragment } = wp.element;

const {
	MediaUpload,
	MediaPlaceholder,
	MediaUploadCheck,
    InspectorControls,
    RichText,
    PlainText
} = wp.blockEditor;
const {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	SelectControl,
	RadioControl
} = wp.components;

const attributes = {
	locations: {
		type: 'array',
		default: [],
	},
	items: {   
		type: "array",     
		source: 'query',
		default: [],
		selector: '.item',
		query: {
			title: {
				type: 'string',
				source: 'text',
				selector: '.title'
			},
			description: {
				type: "string",
				// selector: ".card-content",
				source: "text",
			},
			index: {            
				type: 'number',
				source: 'attribute',
				attribute: 'data-index'            
			}           
		}
	},
	
	image: {
		type: 'object',
		default: {}
	},

    images: {
		type: "array",
		default: []
	},
	autoplay: {
		type: "string",
		default: "true"
	},
	speed: {
		type: "string",
		default: "500"
	},
	delay: {
		type: "string",
		default: "5000"
	},
	loop: {
		type: "string",
		default: "true"
	},
	effect: {
		type: "string",
		default: "slide"
	},

};

registerBlockType("hoora/swiper", {
	title: "hoora swiper", 
	icon: "images-alt2", 
	category: "hoora", 
	attributes,
	edit: Edit,
	save: save,
} );

