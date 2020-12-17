const { Component, Fragment } = wp.element;
const { TextControl, Panel, PanelBody,PanelRow,RangeControl, Button } = wp.components;
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
                            className: 'accordion',
                            placeholder: 'faq Heading'
                        } ],
                        [ 'hoora/section', {
                        className: 'panel',
                        } ],
                    ]}
                    // templateLock="insert" 
                />
            </div>
        </div>
        ]
      }
}
