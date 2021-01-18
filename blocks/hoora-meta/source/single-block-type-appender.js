const { withSelect, select, withDispatch } = wp.data;
const { compose } = wp.compose;
const { Button} = wp.components;
const { createBlock } = wp.blocks;



const SingleBlockTypeAppender = ( { buttonText = __( 'Add Item' ), onClick, clientId, allowedBlock, innerBlocks, ...props } ) => {
    return(
        <Button onClick={ onClick } { ...props} >
            {buttonText}
        </Button>
    );
};


export default compose( [
    withSelect( ( select, ownProps ) => {
        return {
            innerBlocks: select( 'core/block-editor' ).getBlock( ownProps.clientId ).innerBlocks
        };
    } ),
    withDispatch( ( dispatch, ownProps, registry ) => {
        return {
            onClick() {
                const { clientId, setAttributes,innerBlocks,allowedBlock } = ownProps;
                const newBlock = createBlock( allowedBlock );

                // const { getBlockOrder, getBlocksByClientId } = registry.select( 'core/block-editor' );
                const { updateBlockAttributes } = dispatch( 'core/block-editor' );
                dispatch( 'core/block-editor' ).insertBlock( newBlock, innerBlocks.length, clientId );

                //handleAddItem
                const parentAttributes = select('core/block-editor').getBlockAttributes( clientId ); //Pass the Parents CLient Id from above and get all Parent attributes
                const items = [ ...parentAttributes.items ];
                items.push( {
                    sourceTitle: '', sourceLink:''
                } );
                updateBlockAttributes( clientId, {
                    items: items
                } );
            }
        };
    } )
] )( SingleBlockTypeAppender );