/**
 * BLOCK: Gutenberg Repeater Field
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const {
	__,
} = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Button,
	IconButton,
	PanelBody,
	TextControl,
} = wp.components;
const {
	InspectorControls,
} = wp.editor;
const {
	Fragment,
} = wp.element;

/**
 * Register: Repeater Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'grf/gutenberg-repeater-field', {
	title: __( 'Gutenberg Repeater Field' ),
	icon: 'shield',
	category: 'common',
	attributes: {
		locations: {
			type: 'array',
			default: [],
			// source: 'query',
			// query:{
			// 	address:{
			// 		type: 'string',
			// 		source: 'text',
			// 		default: ''
			// 	}
			// }
		},
	},
	keywords: [
		__( 'Gutenberg Repeater Field' ),
		__( 'Repeatable' ),
		__( 'ACF' ),
	],
	edit: ( props ) => {
		const { attributes : {locations}, setAttributes, className } = this.props;
		const handleAddLocation = () => {
			const locations = [ ...locations ];
			console.log('locations' + locations[0].address);
			// locations.push( {
			// 	address: '',
			// } );
			// selectedImages.splice(selectedImageIndex + 1, 0, updatedImage);
			console.log('locations2' + locations[0].address);

			// locations.map(location => {
			// 	return{
			// 		address : ''
			// 	}
			// })
			setAttributes( { locations } );
		};

		const handleRemoveLocation = ( index ) => {
			const locations = [ ...locations ];
			locations.splice( index, 1 );
			setAttributes( { locations } );
		};

		const handleLocationChange = ( address, index ) => {
			const locations = [ ...locations ];
			locations[ index ].address = address;
			setAttributes( { locations } );
		};

		let locationFields,
			locationDisplay;

		if ( locations.length ) {
			locationFields = locations.map( ( location, index ) => {
				return <Fragment key={ index }>
					<TextControl
						className="grf__location-address"
						placeholder="350 Fifth Avenue New York NY"
						value={ locations[ index ].address }
						onChange={ ( address ) => handleLocationChange( address, index ) }
					/>
					<IconButton
						className="grf__remove-location-address"
						icon="no-alt"
						label="Delete location"
						onClick={ () => handleRemoveLocation( index ) }
					/>
				</Fragment>;
			} );

			locationDisplay = locations.map( ( location, index ) => {
				return <p key={ index }>{ location.address }</p>;
			} );
		}

		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Locations' ) }>
					{ locationFields }
					<Button
						isDefault
						onClick={ handleAddLocation.bind( this ) }
					>
						{ __( 'Add Location' ) }
					</Button>
				</PanelBody>
			</InspectorControls>,
			<div key="2" className={ props.className }>
				<h2>Block</h2>
				{ locationDisplay }
			</div>,
		];
	},
	save: ( props ) => {
		const { attributes : {locations}, setAttributes, className } = this.props;
		const locationFields = locations.map( ( location, index ) => {
			return <p key={ index }>{ location.address }</p>;
		} );

		return (
			<div className={ props.className }>
				<h2>Block</h2>
				{ locationFields }
			</div>
		);
	},
} );