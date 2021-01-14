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
                const { clientId, setAttributes,innerBlocks,allowedBlock } = ownProps;
                const newBlock = createBlock( allowedBlock );

                const { getBlockOrder, getBlocksByClientId } = registry.select( 'core/block-editor' );
                const { updateBlockAttributes } = dispatch( 'core/block-editor' );

                //update own isEditable
                // setAttributes( { isEditing } );

                const innerBlockIds = getBlockOrder( clientId );
                const ggetBlocksByClientId = getBlocksByClientId(clientId);
                // console.log('ggetBlocksByClientId');
                // console.log(ggetBlocksByClientId);
                innerBlockIds.forEach( ( innerBlockId, index ) => {
                    updateBlockAttributes( innerBlockId, {
                        id: index ,
                    } );
                } );

                dispatch( 'core/block-editor' ).insertBlock( newBlock, innerBlocks.length, clientId );
                // let trim_levelss = select( 'core/editor' ).getEditedPostAttribute( 'meta' ).trim_levels;
                // trim_levelss = [{title:'aa', features:'ff', options:[{engine:'ooo',horse_power:'hhh',transmission:'ttt'}]}, ...trim_levelss];
                // dispatch( 'core/editor' ).editPost({ meta: { trim_levels: trim_levelss } });
            }
        };
    } )
] )( SingleBlockTypeAppender );