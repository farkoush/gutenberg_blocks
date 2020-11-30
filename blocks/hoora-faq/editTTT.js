/**
 * Internal block libraries
 */
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

        return[(
            // isSelected && (
                <InspectorControls>
                    <PanelBody>
                        <TextControl
                            label= 'question' 
                            value={ attributes.question }
                            onChange={ question => setAttributes( { question } ) }
                        />
                    </PanelBody>
                    <PanelBody>
                        <TextControl
                            label= 'answer'
                            value= { attributes.answer }
                            onChange={ answer => setAttributes( { answer } ) }
                        />
                    </PanelBody>
                </InspectorControls>
            // ),
        ),
        <Panel header="My Panel">
            <PanelBody title="My Block Settings" icon={ more } initialOpen={ true }>
                <PanelRow>
                    <InnerBlocks
                        template={ INNER_BLOCKS_TEMPLATE }
                        allowedBlocks={ ALLOWED_BLOCKS }
                        // templateLock={ true }
                        orientation="horizontal"
                    />
                </PanelRow>
            </PanelBody>
        </Panel>
        ]

      }
}
