
const { registerBlockType } = wp.blocks;
const { __ } = window.wp.i18n;
const { InnerBlocks } = wp.blockEditor;

// import Edit from "./edit";

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

registerBlockType( 'hoora/tabheader', {
    title: 'tabheader',
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
// registerBlockType( 'hoora/tab', {
//     title: 'tab',
//     // icon: 'welcome-learn-more',
//     icon: 'heart',
//     category: 'formatting', // (common, formatting, layout, widgets, embed)
//     // parent: [ 'hoora/tab' ],
//     attributes : {
//         activeTab: {
//             type: "number",
//             default: 0}
//     },
//     edit : Edit,
//     save: (  ) => {
//         return(
//             <div className="">
//                 <InnerBlocks.Content />
//                 save
//             </div>
//         )
//     },

// });

