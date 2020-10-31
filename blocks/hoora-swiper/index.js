import "./style.scss";
import "./editor.scss";
import Edit from './edit';

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
	items: {        
		source: 'query',
		default: [],
		selector: '.item',
		query: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.title'
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

	// edit:Edit,
	edit:  props => {

		var attributes = props.attributes;
		var itemList = attributes.items.sort(  (a , b) => {
		  return a.index - b.index;
		}).map( item => {          
		  	return <div className = 'item'>  
				<RichText             
					tagName = 'h1'
					placeholder= 'Here the title goes...'              
					value = {item.title}
					autoFocus = 'true'
					onChange = { value  => {                                
						var newObject = Object.assign({}, item, {
						title: value
						});
						return props.setAttributes({
						items: [].concat(_cloneArray(props.attributes.items.filter( itemFilter => {
							return itemFilter.index != item.index;
						})), [newObject])
						});
					}}
		  		/>
				{/* <RichText             
					tagName = 'p'
					placeholder= 'Here the body goes...'              
					value = {item.body}
					autoFocus = 'true'
					onChange = { value  => {                                
						var newObject = Object.assign({}, item, {
						body: value
						});
						return props.setAttributes({
						items: [].concat(_cloneArray(props.attributes.items.filter( itemFilter => {
							return itemFilter.index != item.index;
						})), [newObject])
						});
					}}
		  		/> */}
		  </div>
		});
		function _cloneArray(arr) { 
			if (Array.isArray(arr)) { 
			  for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { 
				arr2[i] = arr[i]; 
			  } 
			  return arr2; 
			} else { 
			  return Array.from(arr); 
			} 
		  }
		  return <div className= {props.className}>
			<div className = 'item-list'>{itemList}</div>     
			<Button	className= 'button add-row'            
				onClick= { () => {              
				  return props.setAttributes({
					items: [].concat(_cloneArray(props.attributes.items), [{
					  index: props.attributes.items.length,                  
					  title: "" 
					}])
				  });                            
				}
			  }>
			  'Add Row'
			</Button>        
		  </div>
	},

	// save: function(props) {
	// 	const { list,lists,image,images, autoplay, loop, speed, delay, effect, titles, title } = props.attributes;
	// 	return (
	// 		<div
	// 			className={`swiper-container hoora-swiper-container hoora-swiper-container`}
	// 			data-autoplay={autoplay}
	// 			data-delay={delay}
	// 			data-loop={loop}
	// 			data-speed={speed}
	// 			data-effect={effect}
	// 		>
	// 			<div className="swiper-wrapper hoora-swiper-wrapper">
	// 				{images.map((image, index) => {
	// 					console.log("imageee" + image.alt);
	// 					return (
	// 						<div className="swiper-slide hoora-swiper-slide">
	// 							<img src={image.url} alt={image.alt} />
	// 							{/* <h3 className="card__title">{ title }</h3> */}
	// 							{/* <div className="card__body">
	// 								{ body }
	// 							</div> */}
	// 						</div>
	// 					);
	// 				})}
	// 			</div>
	// 			<div className="swiper-pagination hoora-swiper-pagination" />
	// 			<div className="hoora-swiper-button-prev swiper-button-prev hoora-swiper-button-prev" />
	// 			<div className="hoora-swiper-button-next swiper-button-next hoora-swiper-button-next" />
	// 		</div>
	// 	);
	// }
	save: function( props ) {

		var attributes = props.attributes;            
	  
		if (attributes.items.length > 0) {
	  
		  var itemList = attributes.items.map(function(item) {          
		  
			return el('div', { className: 'item', 'data-index': item.index },        
			  el( 'h1', {              
				className: 'title',                                 
			  }, item.title)            
			);
	  
		  });
	  
		  return el(
			'div',
			{ className: props.className },
			el('div', { className: 'item-list' },        
			  itemList
			)              
		  ); 
	  
		} else {
		  return null;
		}
	  }
});
