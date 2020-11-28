/**
 * Internal block libraries
 */
const { Component, Fragment } = wp.element;
const { TextControl, PanelBody,RangeControl, Button } = wp.components;
const { InspectorControls, 	MediaUpload, MediaUploadCheck } = wp.blockEditor;
// import Map from './map'

export default class Edit extends Component {
    
    // constructor() {
    //     super( ...arguments );
    //     this.state = {
    //         googleMapsLoaded: false,
    //     };
    // }
    
    render() {
        const { attributes, className, setAttributes, isSelected } = this.props;
        // console.log('zoom' + attributes.zoom)
        return(
            <div>hhhh</div>
        )

      }
}
