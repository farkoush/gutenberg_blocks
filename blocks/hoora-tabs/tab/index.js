
const { registerBlockType } = wp.blocks;
const { __ } = window.wp.i18n;
const { InnerBlocks } = wp.blockEditor;

import Edit from "./edit";

registerBlockType( 'hoora/tab', {
    title: 'tab',
    icon: 'heart',
    category: 'formatting', // (common, formatting, layout, widgets, embed)
    // parent: [ 'hoora/tab' ],
    attributes : {
        activeTab: {
            type: "number",
            default: 0
        },
        title: {
            type: "string",
            default: ""
        },
        content: {
            type: "array",
            default: []
        }
    },
    edit : Edit,
    save: (  ) => {
        return(
            <div className="">
                <InnerBlocks.Content />
                {/* save */}
            </div>
        )
    },

});

