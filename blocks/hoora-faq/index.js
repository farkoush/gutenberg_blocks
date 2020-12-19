// WordPress dependencies.
const { Inserter, InnerBlocks } = wp.blockEditor;
const { IconButton, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;

function MyButtonBlockAppender( { rootClientId } ) {
    return (
        <Inserter
            rootClientId={ rootClientId }
            renderToggle={ ( { onToggle, disabled } ) => (
                <IconButton
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

registerBlockType( 'hoora/faq', {
    title: 'hoora faq',
    category: 'hoora',

    edit( { className, clientId } ) {
        return (
            <div className={ className }>
                <InnerBlocks
                    allowedBlocks={['hoora/faqitem']}
                    template={[['hoora/faqitem']]}
                    renderAppender={ () => (
                        <MyButtonBlockAppender rootClientId={ clientId } />
                    ) }
                />
            </div>
        );
    },

    save() {
        return (
            <div>
                <InnerBlocks.Content />
            </div>
        );
    },
} );