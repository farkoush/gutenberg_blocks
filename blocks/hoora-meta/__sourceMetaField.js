const { withSelect, select, withDispatch } = wp.data;
const { compose } = wp.compose;
// const { createContext, useContext, useState } = wp.element;
const { TextControl,CheckboxControl, ToggleControl , SelectControl, PanelBody, PanelRow } = wp.components;
import ClassManager from '../components/ClassManager.js';

const { Component } = wp.element;
class sourceMetaField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: 'default'
        };
    } 
    render(){
        // const [state, setState] = useState("");
        return ( 
            <div>
                <PanelBody title="منابع" initialOpen={false} >
                    <PanelRow>
                        {/* <CheckboxControl
                            label= 'Source'
                            help= 'افزودن منابع به پست'
                            checked={ props.metaFieldSource }
                            onChange = { ( content ) => { props.setMetaSource( content ) } }
                        /> */}
                        <TextControl
                            label= 'منابع'
                            value= {this.props.metaFieldSource}
                            onChange={ content =>  this.props.setMetaSource( content ) } 
                        />
                    </PanelRow>
                    <PanelRow>
                    <ClassManager
                            isPanel='true'
                            classes={this.state.classes}
                            onChange={(val) => this.setState({ classes: val })}
                        />
                    </PanelRow>
                    {/* <PanelRow>
                        <CheckboxControl
                            label= 'Gallery'
                            help= 'افزودن گالری به پست'
                            checked={ props.metaFieldGallery }
                            onChange = { ( content ) => { props.setMetaGallery( content ) } }
                        />
                    </PanelRow> */}
                </PanelBody>
            </div>  
    
        );
    }
// const sourceMetaField = (props) => {
    // const blockIds = blocks.map(block => block.clientId);

  };
  export default compose(
    withDispatch( function( dispatch, props ) {
        return {
            setMetaSource: function( content ) {
                dispatch( 'core/editor' ).editPost( { meta: { [ props.source ]: content } } );
            },
            // setMetaAttachment: function( content ) {
            //     dispatch( 'core/editor' ).editPost( { meta: { [ props.attachment]: content } } );
            // },
            // setMetaGallery: function( content ) {
            //     dispatch( 'core/editor' ).editPost( { meta: { [ props.gallery]: content } } );
            // }
        }
    } ),
    withSelect( function( select, props ) {
        return {
            metaFieldSource: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.source ],
            // metaFieldAttachment: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.attachment ],
            // metaFieldGallery: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.gallery ],
        }
    } )
)(sourceMetaField);
  