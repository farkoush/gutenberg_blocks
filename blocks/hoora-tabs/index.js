const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;
import Edit from "./edit";

const attributes = {
	// id: {
	// 	type: "number",
	// 	default: -1,
	// },
	// activeControl: {
	// 	type: "string",
	// },
	activeTab: {
		type: "number",
		default: 0,
	},
	tabsTitle: {
		type: "array",
		default: [],
	},
	tabsContent: {
		type: "array",
		default: [],
	},
	// tabsContent: {
	// 	source: "query",
	// 	selector: ".tabs",
	// 	query: {
	// 		content: {
	// 			type: "array",
	// 			source: "children",
	// 			// selector: ".",
	// 		},
	// 	},
	// },
	// tabsTitle: {
	// 	source: "query",
	// 	selector: ".tabs",
	// 	query: {
	// 		content: {
	// 			type: "array",
	// 			source: "children",
	// 			// selector: ".tab-title",
	// 		},
	// 	},
	// },
	
};

registerBlockType( 'hoora/tabs', {
    title: 'hoora tabs',
    category: 'hoora',
    attributes,
    edit:Edit,
    save({attributes,className}) {
        return (
            <div className={'hoora-tab-save'}>
                <p>Tab panel</p>
                <div class="container">

                    <ul class="tabs">
                        <li class="tab-link current" data-tab="tab-1">Tab Two</li>
                        <li class="tab-link" data-tab="tab-2">Tab Two</li>
                    </ul>
                    
                    <div className="tab-panel">
                        <div id="tab-1" class="tab-content current">
                            <InnerBlocks.Content />
                        </div>
                        <div id="tab-2" class="tab-content">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>

                </div>
            </div>
        );
    },
} );