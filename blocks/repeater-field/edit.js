// import produce from "immer";
// import { __ } from "@wordpress/i18n";
import "./editor.scss";
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

// import { RichText, PlainText } from "@wordpress/block-editor";
// import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes, className }) {
	const handleAddLocation = () => {
        const locations = [ ...attributes.locations ];
        locations.push( {
            address: '', city:''
        } );
        setAttributes( { locations } );

        // const locations = [ ...attributes.locations, {address:"",index:attributes.locations.length} ];
        // setAttributes( { locations } );


        // setAttributes ({
        // 	locations : [
        // 		...attributes.locations,{address:"",index:attributes.locations.length}
        // 	]
        // })
    };

    const handleRemoveLocation = ( index ) => {
    	const locations = [ ...attributes.locations ];
    	locations.splice( index, 1 );
    	setAttributes( { locations } );
    };

    const handleLocationChange = ( address, index ) => {
        // const locations = [ ...attributes.locations, {address} ];
        const locations = [ ...attributes.locations ];
        locations[ index ].address = address;
        setAttributes( { locations } );
    };
    const handleLocationChangeCity = ( city, index ) => {
        // const locations = [ ...attributes.locations, {city} ];
        const locations = [ ...attributes.locations ];
        locations[ index ].city = city;
        setAttributes( { locations } );
    };

    let locationFields,
        locationDisplay;

    if ( attributes.locations.length ) {
        locationFields = attributes.locations.map( ( location, index ) => {
            return <Fragment key={ index }>
                <TextControl
                    className="grf__location-address"
                    placeholder="350 Fifth Avenue New York NY"
                    // value = {location.address}
                    value={ attributes.locations[ index ].address }
                    onChange={ ( address ) => handleLocationChange( address, index ) }
                />
                <TextControl
                    className="grf__location-address"
                    placeholder="350 Fifth Avenue New York NY"
                    // value = {location.address}
                    value={ attributes.locations[ index ].city }
                    onChange={ ( city ) => handleLocationChangeCity( city, index ) }
                />
                <IconButton
                    className="grf__remove-location-address"
                    icon="no-alt"
                    label="Delete location"
                    onClick={ () => handleRemoveLocation( index ) }
                />
            </Fragment>;
        } );

        locationDisplay = attributes.locations.map( ( location, index ) => {
            return <p key={ index }>{ location.address } { location.city }</p>;
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
        <div key="2" className={ className }>
            <h2>Block</h2>
            { locationDisplay }
        </div>,
    ];
}
