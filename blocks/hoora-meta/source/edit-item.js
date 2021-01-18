import { TextControl} from '@wordpress/components';
const { Component, Fragment } = wp.element;

export default class EditItem extends Component {
    constructor() {
        super( ...arguments );
    }
    render() {
        const { attributes, setAttributes } = this.props;
        // const parentClientId = select( 'core/block-editor' ).getBlockHierarchyRootClientId( this.props.clientId ); //Pass Child's Client Id.
        // const parentAttributes = select('core/block-editor').getBlockAttributes( parentClientId ); //Pass the Parents CLient Id from above and get all Parent attributes
        // const { updateBlockAttributes } = dispatch( 'core/block-editor' );
        
        const updateValue = ( value,prop, index ) => {
            //set value in local attributes
            var obj = { ...attributes.source_attr}
            obj[prop] = value;
            setAttributes( {source_attr: obj }  );
            //set every object source title and link in parent array
            // const items = [ ...parentAttributes.items ];
            // items.push(attributes.obj);
            // items[ index ] = attributes.source_attr;
            // updateBlockAttributes( parentClientId, {
            //     items:items ,
            // } );
        };
        // if ( parentAttributes.items.length > 0 ) {
            return(
                <Fragment key={ attributes.idx }>
                    <p>{attributes.idx}</p>
                    <TextControl 
                        label= 'source title'
                        value={ attributes.source_attr.sourceTitle }
                        key = {`source-title ${attributes.idx}`}
                        onChange = {( value ) => updateValue( value, 'sourceTitle', attributes.idx )}
                    />
                    <TextControl 
                        label= 'source link'
                        value={ attributes.source_attr.sourceLink }
                        key = {`source-link ${attributes.idx}`}
                        onChange = {( value ) => updateValue( value, 'sourceLink',  attributes.idx )}
                    />
                </Fragment>
            );
        // }
    }
}