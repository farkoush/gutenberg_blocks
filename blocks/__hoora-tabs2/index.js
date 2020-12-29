import "./style.scss";
import "./editor.scss";
import Edit from "./edit";
import save from "./save";
const { registerBlockType } = wp.blocks;
var el = wp.element.createElement;

const { __ } = wp.i18n; 
// const { Component, Fragment } = wp.element;

const attributes = {
	items: {
		type: 'array',
		default: [],
	},
	itemsOld: {   
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
	// autoplay: {
	// 	type: "string",
	// 	default: "true"
	// },
	// speed: {
	// 	type: "string",
	// 	default: "500"
	// },
	// delay: {
	// 	type: "string",
	// 	default: "5000"
	// },
	// loop: {
	// 	type: "string",
	// 	default: "true"
	// },
	// effect: {
	// 	type: "string",
	// 	default: "slide"
	// },

};

registerBlockType("hoora/tabs2", {
	title: "hoora tabs 2", 
	icon: "images-alt2", 
	category: "hoora", 
	attributes,
	edit: Edit,
	save: save,
} );

