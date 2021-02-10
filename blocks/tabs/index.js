import icons from '../icons';

import attributes from './attributes';
import classnames from 'classnames';
import times from 'lodash/times';
const {
	Fragment,
} = wp.element;
const {
	InnerBlocks,
	RichText,
} = wp.blockEditor;
import edit from './edit';
import save from './save';
const { __, sprintf } = wp.i18n;
const { registerBlockType } = wp.blocks;

function kt_stripStringRender( string ) {
	return string.toLowerCase().replace( /[^0-9a-z-]/g, '' );
}

registerBlockType( 'hoora/tabs', {
	title: __( 'Tabs' ),
	icon: {
		src: icons.blocktabs,
	},
	category: 'hoora-blocks',
	keywords: [
		__( 'tabs' ),
		__( 'tab' ),
		__( 'KT' ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	// getEditWrapperProps( { blockAlignment } ) {
	// 	if ( 'full' === blockAlignment || 'wide' === blockAlignment || 'center' === blockAlignment ) {
	// 		return { 'data-align': blockAlignment };
	// 	}
	// },
	edit,
	save,
} );
