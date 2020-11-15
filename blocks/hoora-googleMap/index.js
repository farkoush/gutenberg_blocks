/**
 * Block dependencies
 */
// import './style.scss';

import Edit from "./edit";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { TextControl, PanelBody,RangeControl } = wp.components;
const { InspectorControls } = wp.blockEditor;

/**
 * Register example block
 */
export default registerBlockType(
	'hoora/google-map',
	{
		title: 'Google Map Block',
		description: 'An advanced Gutenberg Block that allows you to build an interactive Google Map.',
		category: 'common',
		icon: 'location-alt',
		attributes: {
			text: {
				type: 'string',
				default:''
				// source: 'meta',
				// meta: 'googlemapblock_gb_googlemap',
			},
			center: {
                type: "array",
                default:[
                    {
                        lat: 23.7806365,
                        lng: 90.4193257,
                    }
                ]
			},
			address: {
                type: 'string',
                default: 'Theater District, New York, USA',
            }, 
			zoom: {
                type: 'number',
                default: '11',
            },
            height: {
                type: 'number',
                default: '300',
            }
		},
		edit:Edit,
		save: () => {
			return (
				<div id="myMapp">'Check the meta' </div>
			);
		},
	},
);
