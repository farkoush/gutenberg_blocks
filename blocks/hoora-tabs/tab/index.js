
const { registerBlockType } = wp.blocks;
const { __ } = window.wp.i18n;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

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
            type: "string",
            default: "0"
        }
        // paragraph: {
        //     type: "string",
        //     default: ''
        // }
    },
    edit : Edit,
    save: ( {attributes,className} ) => {
        const blockProps = useBlockProps.save();
        return(
            // <div { ...blockProps } className="" tabIndex={attributes.tabIndex}>
            <div className="" tabIndex={attributes.tabIndex}>
                <p>tabIndex : {attributes.tabIndex}</p>
                <p>tabTitle: {attributes.tabTitle}</p>
                <InnerBlocks.Content/>
            </div>
        )
    },
    // save(props) {
    //     const {attributes} = props;
    //       return(
    //         <div className={'flex-column' + ' ' }>
    //         <InnerBlocks.Content />
    //         </div>
    //     );
    //   }

});

