/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';
import apiFetch from '@wordpress/api-fetch';


/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Spinner } = wp.components;
const { withSelect } = wp.data;

registerBlockType(
    'jsforwpblocks/navigation',
    {
        title: __( 'Example - navigation Block', 'jsforwpblocks'),
        description: __( 'A look at how to build a basic navigation block.', 'jsforwpblocks'),
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },         
        category: 'widgets',
        edit(){
            // return wp.apiFetch( { path: '/wp/v2/posts' } ).then( posts => { console.log( posts ); } )
            return (
                wp.apiFetch( { path: '/menus/v1/menus' } ).then( menus => { 
                   menus.forEach(menu => {
                        console.log(menu)
                   }); 
                } )
            ) 
        } 

        , // end edit
        save() {
            // Rendering in PHP
            return null;
        },
} );
