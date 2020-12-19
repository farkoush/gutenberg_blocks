const { Component, Fragment } = wp.element;
const { TextControl, Panel, PanelBody,PanelRow,RangeControl, Button, createBlock } = wp.components;
const { InspectorControls, 	MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
import { more } from '@wordpress/icons';

export default class Edit extends Component {   
    render() {
        const { attributes, className, setAttributes, isSelected } = this.props;
        return[
        <div>
            <div>
                <InnerBlocks
                    // allowedBlocks={ [ 'core/image', 'core/paragraph' ] }
                    template={[
                        [ 'core/heading', {
                            className: 'tab-link',
                            placeholder: 'tab Heading',
                            dataTab="tab-1"
                        } ],
                        // [ 'hoora/section', {
                        // className: 'panel',
                        // } ],
                        [ 'hoora/group', {
                            className: 'tab-content',
                            
                        } ],
                    ]}
                    // templateLock="insert" 
                />
            </div>
        </div>
        ]
      }
}
