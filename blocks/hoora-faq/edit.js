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
        // console.log('zoom' + attributes.zoom)
        const INNER_BLOCKS_TEMPLATE = [
            [
                'core/columns',
                {
                    className: 'swiper-wrapper',
                },
            ],
        ];
        const ALLOWED_BLOCKS = ['core/columns', 'core/column'];

        return[
        <div>
            <h2>Animated Accordion</h2>
            <p>Click on the buttons to open the collapsible content.</p>
            <div>

                    <TextControl
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
                    </div>
            </div>
            {/* <Item header="Section 1" body="<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"/>
            <Item header="Section 2" body="<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"/>
            <Item header="Section 3" body="<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"/> */}
        </div>
        ]
      }
}
