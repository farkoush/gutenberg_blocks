/**
 * WordPress dependencies
 */
import { useSelect, useDispatch, select, dispatch } from '@wordpress/data';
import { TextControl} from '@wordpress/components';
const { Component, Fragment } = wp.element;


export default class EditItem extends Component {
    constructor() {
        super( ...arguments );
    }
    
    render() {
        const { attributes,className, clientId, setAttributes } = this.props;
        const parentClientId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( this.props.clientId ); //Pass Child's Client Id.
        const parentAttributes = select('core/block-editor').getBlockAttributes( parentClientId ); //Pass the Parents CLient Id from above and get all Parent attributes
        const { updateBlockAttributes } = dispatch( 'core/block-editor' );
        
        // const updateMeta= ( value, prop, index ) => { // the 'prop' is the current property to be updated
        //     let meta__ = select( 'core/editor' ).getEditedPostAttribute( 'meta' )._meta_source;
        //     meta__ = { titleee: '', linkkk: '', ...meta__};
        //     meta__[ prop ] = value;
        //     dispatch( 'core/editor' ).editPost({ meta: { _meta_source: meta__ } });
        // }
        const updateValue = ( value,prop, index ) => {
            var obj = { ...attributes.source_attr}
            obj[prop] = value;
            setAttributes( {source_attr: obj }  );


            const items = [ ...parentAttributes.items ];
            // items.push(attributes.obj);
            items[ index ] = attributes.source_attr;
            updateBlockAttributes( parentClientId, {
                items:items ,
            } );

            console.log(parentAttributes.items);
        };

        return (
            <div className={className} key= { attributes.idx}>
                <p>{attributes.idx}</p>
                        <TextControl 
                            label= 'source title'
                            value={ attributes.source_attr.title }
                            key = {`source-title ${attributes.idx}`}
                            onChange = {( value ) => updateValue( value, 'title', attributes.idx )}
                        />
                        <TextControl 
                            label= 'source link'
                            value={ attributes.source_attr.link }
                            key = {`source-link ${attributes.idx}`}
                            onChange = {( value ) => updateValue( value, 'link',  attributes.idx )}
                        />
                </div>
        );
    }
}