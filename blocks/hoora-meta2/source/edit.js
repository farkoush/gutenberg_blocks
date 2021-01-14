/**
 * WordPress dependencies
 */
import { useSelect, useDispatch, select, dispatch } from '@wordpress/data';
const { compose, withState } = wp.compose;
const { Component, Fragment } = wp.element;
const { Inserter,InnerBlocks } = wp.blockEditor;

import SingleBlockTypeAppender from './single-block-type-appender.js'
import BlockList from "../components/BlockList";


/**
 * Internal dependencies
 */
function MyButtonBlockAppender( { rootClientId } ) {
    return (
        <Inserter
            rootClientId={ rootClientId }
            renderToggle={ ( { onToggle, disabled } ) => (
                <Button
                    className="my-button-block-appender"
                    onClick={ onToggle }
                    disabled={ disabled }
                    label="Add a New Item"
                    icon="plus"
                />
            ) }
            isAppender
        />
    );
}

export default class Edit extends Component {
    constructor() {
        super( ...arguments );
        // this.state = {
        //     data: [],
        //     };
    }
    
    // componentDidMount() {
        // let _meta_source = select( 'core/editor' ).getEditedPostAttribute( 'meta' )._meta_source;
        // let metass = select( 'core/editor' ).getEditedPostAttribute( 'meta' ).metas;
        // metass = [{title1:_meta_source.titleee , features:_meta_source.linkkk}, ...metass];
        // console.log(metass)
        // dispatch( 'core/editor' ).editPost({ meta: { metas: metass } });
    // }
    render() {
        const { attributes,className, clientId, setAttributes } = this.props;
        return (
            <div className={className}>
                    <BlockList clientId={clientId}/>
                    <InnerBlocks
                        allowedBlocks={['hoora/sourceitem']}
                        template={[['hoora/sourceitem']]}
                        // renderAppender={ () => (
                        //     <MyButtonBlockAppender rootClientId={ clientId } />
                        // ) }
                        renderAppender = {
                            () =>
                                <SingleBlockTypeAppender
                                    isDefault
                                    isLarge
                                    buttonText="Add Block"
                                    allowedBlock="hoora/sourceitem"
                                    clientId={ clientId }
                                />
                        }
                    />
                </div>
        );
    }
}