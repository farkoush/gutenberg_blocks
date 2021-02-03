    const {registerBlockType} = wp.blocks;
    const {TextControl,TextareaControl} = wp.components;

    registerBlockType( 'hoora/meta-block', {
        title: 'Meta Block',
        icon: 'edit',
        category: 'widgets',

        attributes: {
            blockValue: {
                type: 'string',
                source: 'meta',
                meta: 'dc_references_block_field'
            },
            // Add two new attributes
            name: {
                type: 'string',
                source: 'meta',
                meta:'dc_references_block_field_name'
                // meta: 'sidebar_plugin_meta_city'
            },
            desc: {
                type: 'string',
                source: 'meta',
                meta: 'dc_references_block_field_desc'
            }
        },

        edit: ( {className, setAttributes,attributes} ) => { 
            return (
                <div className={className}>
                    {console.log(attributes.blockValue)}
                    <TextControl label= 'write here name of company'
                        value = { attributes.blockValue }
                        key = 'companyName'
                        onChange = {( value ) => { setAttributes( { blockValue: value } )}}
                    />
                    <TextControl 
                        label= 'Write your name'
                        value = { attributes.name }
                        key = 'username'
                        onChange = {( value ) => { setAttributes( { name: value } )}}
                    />
                    <TextareaControl
                        label= 'Write a description'
                        value = { attributes.desc }
                        key = 'desc'
                        onChange = {( value ) => { setAttributes( { desc: value } )}}
                    />
                </div>
            );
        },

        save: () => {
            return null;
        }
    } );
