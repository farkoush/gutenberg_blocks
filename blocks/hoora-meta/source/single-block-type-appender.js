const { withSelect, select, withDispatch } = wp.data;
const { compose } = wp.compose;
const {TextControl,TextareaControl, Button} = wp.components;
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
                const { clientId, setAttributes,innerBlocks,allowedBlock, items } = ownProps;
                const newBlock = createBlock( allowedBlock );

                const { getBlockOrder, getBlocksByClientId } = registry.select( 'core/block-editor' );
                const { updateBlockAttributes } = dispatch( 'core/block-editor' );
                dispatch( 'core/block-editor' ).insertBlock( newBlock, innerBlocks.length, clientId );

                // const handleAddItem = () => {
                    const parentAttributes = select('core/block-editor').getBlockAttributes( clientId ); //Pass the Parents CLient Id from above and get all Parent attributes
                    const itemss = [ ...parentAttributes.items ];
                    itemss.push( {
                        sourceTitle: '', sourceLink:''
                    } );
                    updateBlockAttributes( clientId, {
                        items: itemss ,
                    } );

                    // let meta__ = select( 'core/editor' ).getEditedPostAttribute( 'meta' ).metas;
                    // meta__.push({sourceTitle: '', sourceLink:''})
                    // console.log(wp.data.select('core/editor').getBlock(clientId));
                // };
            }
        };
    } )
] )( SingleBlockTypeAppender );