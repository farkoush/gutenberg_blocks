
const { registerBlockType } = wp.blocks;
const { __ } = window.wp.i18n;
const { InnerBlocks } = wp.blockEditor;
registerBlockType( 'hoora/tabpane', {
    title: 'Tab Pane',
    // icon: 'welcome-learn-more',
    icon: 'heart',
    category: 'formatting', // (common, formatting, layout, widgets, embed)
    // customClassName: false,
    // parent: [ 'hoora/tab' ],
    // className: false
    // attributes,
    // edit: Edit,
    edit : () => {
        return(

            // <div>edit</div>
            <InnerBlocks
                allowedBlocks={['core/columns']}
                template={[['core/columns']]}
            />
        )
    },
    save: (  ) => {
        return(
            <div className="">
                <InnerBlocks.Content />
                save
            </div>
        )
    },

});

registerBlockType( 'hoora/tabitem', {
    title: 'tabitem',
    // icon: 'welcome-learn-more',
    icon: 'heart',
    category: 'formatting', // (common, formatting, layout, widgets, embed)
    // parent: [ 'hoora/tab' ],
    edit : () => {
        return(

            // <div>edit</div>
            <InnerBlocks
                allowedBlocks={['core/heading']}
                template={[['core/heading']]}
            />
        )
    },
    save: (  ) => {
        return(
            <div className="">
                <InnerBlocks.Content />
                save
            </div>
        )
    },

});

