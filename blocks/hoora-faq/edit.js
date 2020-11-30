/**
 * Internal block libraries
 */
    import './editor.scss';
    import Item from './item'
const { Component, Fragment } = wp.element;
const { TextControl, Panel, PanelBody,PanelRow,RangeControl, Button } = wp.components;
const { InspectorControls, 	MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
import { more } from '@wordpress/icons';
// import Accordion from './accordion'

export default class Edit extends Component {
    componentDidMount() {        
    //     // console.log('componentDidUpdate()')
    //   //   if (window.accordion) {
    //       var acc = document.getElementsByClassName("accordion");
    //       console.log('acccccccccccccc' + acc);
    //       var i;
    //       for (i = 0; i < acc.length; i++) {
    //         acc[i].addEventListener("click", function() {
    //           this.classList.toggle("active");
    //           var panel = this.nextElementSibling;
    //           if (panel.style.maxHeight) {
    //             panel.style.maxHeight = null;
    //           } else {
    //             panel.style.maxHeight = panel.scrollHeight + "px";
    //           }
    //         });
    //       }
    //   //   } 
    console.log('componentDidMount');
    }
    
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
        //     (
        //     isSelected && (
        //         <InspectorControls>
        //             <PanelBody>
        //                 <TextControl
        //                     label= 'question' 
        //                     value={ attributes.question }
        //                     onChange={ question => setAttributes( { question } ) }
        //                 />
        //             </PanelBody>
        //             <PanelBody>
        //                 <TextControl
        //                     label= 'answer'
        //                     value= { attributes.answer }
        //                     onChange={ answer => setAttributes( { answer } ) }
        //                 />
        //             </PanelBody>
        //         </InspectorControls>
        //     ),
        // ),
        <div>
            <h2>Animated Accordion</h2>
            <p>Click on the buttons to open the collapsible content.</p>
            {/* <div>

                    <TextControl
                        className= 'accordion'
                        label= 'question' 
                        value={ attributes.question }
                        onChange={ question => setAttributes( { question } ) }
                    />
                    <div className="panel">
                        <TextControl
                            label= 'answer'
                            value= { attributes.answer }
                            onChange={ answer => setAttributes( { answer } ) }
                        />
                    </div>
            </div> */}
            <Item header="Section 1" body="<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"/>
            <Item header="Section 2" body="<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"/>
            <Item header="Section 3" body="<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"/>
        </div>
        ]
      }
}
