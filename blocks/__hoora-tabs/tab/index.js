
const { registerBlockType } = wp.blocks;
const { __ } = window.wp.i18n;
const { InnerBlocks } = wp.blockEditor;

import Edit from "./edit";

registerBlockType( 'hoora/tabtab', {
    title: 'tabtab',
    icon: 'heart',
    category: 'formatting', // (common, formatting, layout, widgets, embed)
    // parent: [ 'hoora/tab' ],
    attributes : {
        activeTab: {
            type: "number",
            default: 0
        },
        tabTitle: {
            type: "string",
            default: "tab title",
            selector: 'tabs-tab'
        },
        tabContent: {
            type: "string",
            default: "tab content",
            selector: '.tabs-tab-pane'
        },
        tabIndex:{
            type: "number",
            default: 0
        }
        // paragraph: {
        //     type: "string",
        //     default: ''
        // }
    },
    edit : Edit,
    save: ( {attributes,className} ) => {
        {console.log('attributes')}
        {console.log(attributes)}
        return(
            <div className="">
                {/* <InnerBlocks.Content /> */}
                {/* save */}
                <p>
                    <strong>Title</strong>
                    {attributes.tabTitle}
                </p>
                <p>
                    <strong>Content</strong>
                    {attributes.tabContent}
                </p>
            </div>
        )
    },

});

