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
    
    // componentDidMount() {
    //     wp.apiFetch( { path: '/menus/v1/menus' } ).then( menus => { this.setState({data : menus});}); 
    // }
    render() {
        const { attributes,className, clientId, setAttributes } = this.props;
        const updateMeta= ( value, prop, index ) => { // the 'prop' is the current property to be updated
            let meta__ = select( 'core/editor' ).getEditedPostAttribute( 'meta' )._meta_source;
            // Make sure all props are defined. (and merge with current metadata values)
            meta__ = { titleee: '', linkkk: '', ...meta__};
            // Then update the current property.
            meta__[ prop ] = value;
            dispatch( 'core/editor' ).editPost({ meta: { _meta_source: meta__ } });

            // var newValuesObj = JSON.parse(JSON.stringify(attributes.valuesObj));
            // newValuesObj[index] = value;
            // setAttributes({ valuesObj: newValuesObj });
            // let trim_levelss = select( 'core/editor' ).getEditedPostAttribute( 'meta' ).trim_levels;
            // trim_levelss = [{title:'aa', features:'ff', options:[{engine:'ooo',horse_power:'hhh',transmission:'ttt'}]}, ...trim_levelss];
            // dispatch( 'core/editor' ).editPost({ meta: { trim_levels: trim_levelss } });

        // console.log(trim_levelss);

        }
        return (
            <div className={className} key= { attributes.id}>
                <p>{attributes.id}</p>
                        <TextControl 
                            label= 'source title'
                            value = { attributes.source_attr.titleee }
                            key = {`source-title ${attributes.id}`}
                            onChange = {( value ) => updateMeta( value, 'titleee', attributes.id )}
                        />
                        <TextControl 
                            label= 'source link'
                            value = { attributes.source_attr.linkkk }
                            key = {`source-link ${attributes.id}`}
                            onChange = {( value ) => updateMeta( value, 'linkkk',  attributes.id )}
                        />
                </div>
        );
    }
}