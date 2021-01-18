/**
 * WordPress dependencies
 */
import { select, dispatch, withDispatch } from '@wordpress/data';
const { compose, withState } = wp.compose;
const { Component, Fragment } = wp.element;
const { Inserter,InnerBlocks } = wp.blockEditor;

import SingleBlockTypeAppender from './single-block-type-appender.js'
import BlockList from "../components/BlockList";

export default class Edit extends Component {
    constructor() {
        super( ...arguments );
    }
    
    // componentDidMount() {
    //     let _meta_source = select( 'core/editor' ).getEditedPostAttribute( 'meta' )._meta_source;
    //     let metass = select( 'core/editor' ).getEditedPostAttribute( 'meta' ).metas;
    //     metass = [{title1:_meta_source.titleee , features:_meta_source.linkkk}, ...metass];
    //     console.log(metass)
    //     dispatch( 'core/editor' ).editPost({ meta: { metas: metass } });
    // }
    render() {
        const { attributes,className, clientId, setAttributes } = this.props;
        const { getBlockOrder } = select( 'core/block-editor' );
        const { updateBlockAttributes } = dispatch( 'core/editor' );
        const blocks = select('core/editor').getBlocksByClientId(clientId);

        const innerBlockIds = getBlockOrder( clientId );
        innerBlockIds.forEach( ( innerBlockId, index ) => {
            updateBlockAttributes( innerBlockId, {
                idx: index,
            } );
        } );
        return (
            <div className={className}>
                    <BlockList clientId={clientId}/>
                    <InnerBlocks
                        allowedBlocks={['hoora/sourceitem']}
                        template={[['hoora/sourceitem']]}
                        renderAppender = {
                            () =>
                                <SingleBlockTypeAppender
                                    isDefault
                                    isLarge
                                    buttonText="Add Block"
                                    allowedBlock="hoora/sourceitem"
                                    clientId={ clientId }
                                    items = {attributes.items}
                                />
                        }
                    />
                </div>
        );
    }
}