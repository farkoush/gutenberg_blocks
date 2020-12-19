// WordPress dependencies.
const { Inserter,InnerBlocks } = wp.blockEditor;
// import { Inserter, InnerBlocks } from '@wordpress/block-editor';
const {IconButton, TextControl } = wp.components;
const {registerBlockType } = wp.blocks;
import Edit from "./edit";

function addInnerBlock() {
    const block = createBlock('hoora/tabitem');
    console.log('block' + block)
    // determine how many innerblocks already exist
    const index = wp.data.select('core/editor').getBlocksByClientId(this.props.clientId)[0].innerBlocks.length;
    wp.data.dispatch('core/editor').insertBlock(block, index, this.props.clientId);
}
function MyButtonBlockAppender( { rootClientId, question } ) {
    return (
        <Inserter
            rootClientId={ rootClientId }
            renderToggle={ ( { onToggle, disabled } ) => (
                <div>
                    {/* <TextControl
                        label= 'question' 
                        value={ question }
                        onChange={ question => setAttributes( { question } ) }
                    /> */}
                    <IconButton
                        className="my-button-block-appender"
                        onClick={ onToggle }
                        disabled={ disabled }
                        label="Add a New Item"
                        icon="plus"
                    />
                </div>
            ) }
            isAppender
        />
    );
}
const attributes = {
    question: {
        type: 'string',
        default: 'Question...',
    }, 
}
registerBlockType( 'hoora/tab', {
    title: 'hoora tab',
    // category: 'hoora',
    category: 'formatting',
    attributes,
    edit( { className, clientId, attributes } ) {
        wp.blocks.setDefaultBlockName( 'core/heading' )
        return (
            <div className={ className }>
                <InnerBlocks
                    allowedBlocks={['hoora/tabitem']}
                    template={[['hoora/tabitem']]}
                    renderAppender={ () => (
                        <MyButtonBlockAppender rootClientId={ clientId } question={attributes.question} />
                        // <InnerBlocks.DefaultBlockAppender />
                    ) }
                />
                {/* <InnerBlocks.DefaultBlockAppender /> */}
            </div>
            // <p>edit</p>
        );
    },
    // edit:Edit,

    save() {
        return (
            <div className="tabs">
                <InnerBlocks.Content />
                {/* save */}
            </div>
        );
    },
} );