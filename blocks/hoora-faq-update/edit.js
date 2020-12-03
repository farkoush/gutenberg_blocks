/**
 * Internal block libraries
 */
    // import './editor.scss';
    // import Item from './item'
const { Component, Fragment } = wp.element;
const { TextControl, Panel, PanelBody,PanelRow,RangeControl, Button } = wp.components;
const { InspectorControls, 	MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
import { more } from '@wordpress/icons';
// import Accordion from './accordion'

export default class Edit extends Component {   
    render() {
        const { attributes, className, setAttributes, isSelected } = this.props;
        // console.log('zoom' + attributes.zoom)
        const INNER_BLOCKS_TEMPLATE = [
            [
                'core/columns',
                {
                    className: 'faq-wrapper',
                },
            ],
        ];
        const ALLOWED_BLOCKS = ['core/columns', 'core/column'];

        return[
        <div>
            <h2>Animated Accordion</h2>
            <p>Click on the buttons to open the collapsible content.</p>
            <div>
                <InnerBlocks
                    template={ INNER_BLOCKS_TEMPLATE }
                    allowedBlocks={ ALLOWED_BLOCKS }
                    // templateLock={ true }
                    orientation="horizontal"
                />
            </div>
        </div>
        ]
      }
}
