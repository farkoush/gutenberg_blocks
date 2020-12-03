/**
 * Internal block libraries
 */
import './editor.scss';
// import Item from './item'
const { Component, Fragment } = wp.element;
const { TextControl, Panel, PanelBody,PanelRow,RangeControl, Button } = wp.components;
const { InspectorControls, 	MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
import { more } from '@wordpress/icons';
// import Accordion from './accordion'

export default class Edit extends Component {   
render() {
    const { attributes, className, setAttributes, isSelected } = this.props;
    const INNER_BLOCKS_TEMPLATE1 = [
        [ 'core/heading', { placeholder: 'faq Heading', className: 'accordion' } ],
        [ 'core/paragraph', {placeholder: 'faq body', className: 'panel'} ],
    ];
    // const ALLOWED_BLOCKS = ['core/paragraph'];

    return[
    <div>
        {/* <TextControl
            className= 'accordionn'
            label= 'question' 
            value={ attributes.question }
            onChange={ question => setAttributes( { question } ) }
        />
        <div className="panelL">
            <TextControl
                label= 'answer'
                value= { attributes.answer }
                onChange={ answer => setAttributes( { answer } ) }
            />
        </div> */}
        <InnerBlocks
                template={ INNER_BLOCKS_TEMPLATE1 }
                // allowedBlocks={ ALLOWED_BLOCKS }
                // templateLock={ true }
                orientation="horizontal"
        />
    </div>
    ]
  }
}
