const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const { useSelect } = wp.data;
const { useEntityProp } = wp.core-data;
const { useBlockProps } = wp.block-editor;
 
registerBlockType( 'myguten/meta-block', {
    title: 'Meta Blockkkk',
    icon: 'smiley',
    category: 'text',
 
    edit( { setAttributes, attributes } ) {
        const blockProps = useBlockProps();
        const postType = useSelect(
            ( select ) => select( 'core/editor' ).getCurrentPostType(),
            []
        );
        const [ meta, setMeta ] = useEntityProp(
            'postType',
            postType,
            'meta'
        );
        const metaFieldValue = meta['myguten_meta_block_field'];
        function updateMetaValue( newValue ) {
            setMeta( { ...meta, 'myguten_meta_block_field': newValue } );
        }
 
        return (
            <div { ...blockProps }>
                <TextControl
                    label="Meta Block Field"
                    value={ metaFieldValue }
                    onChange={ updateMetaValue }
                />
            </div>
        );
    },
 
    // No information saved to the block
    // Data is saved to post meta via the hook
    save() {
        return null;
    },
} );