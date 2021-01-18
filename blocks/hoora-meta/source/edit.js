/**
 * WordPress dependencies
 */
import { useSelect, useDispatch, select, dispatch, withDispatch } from '@wordpress/data';
const { compose, withState } = wp.compose;
const { Component, Fragment } = wp.element;
const { Inserter,InnerBlocks } = wp.blockEditor;

import SingleBlockTypeAppender from './single-block-type-appender.js'
import BlockList from "../components/BlockList";


export default class Edit extends Component {
    constructor() {
        super( ...arguments );
    }
    
    componentDidUpdate(previousProps, previousState) {
        var myID = this.props.clientId;
        var source_items = [];
        this.myBlock = wp.data.select('core/block-editor').getBlock(myID);
        this.myBlock.innerBlocks.map((block, index) => {
                source_items.push (block.attributes.source_attr) ;
        });
        this.props.setAttributes({ 'items': source_items });
    }
    render() {
        const { clientId } = this.props;
        const blocks = select('core/editor').getBlocksByClientId(clientId);
        
        return (
            <div>
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
                                />
                        }
                    />
            </div>
        );
    }
}