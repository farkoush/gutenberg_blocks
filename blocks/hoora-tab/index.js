import { Fragment } from "react";

// WordPress dependencies.
const { Inserter, InnerBlocks } = wp.blockEditor;
const { IconButton, Button, TabPanel, PanelBody, PanelRow, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
// import Edit from "./edit";

// WordPress dependencies.
// import { Inserter, InnerBlocks } from '@wordpress/block-editor';
// import { IconButton, TabPanel, PanelBody, PanelRow, TextControl } from '@wordpress/components';
// import { registerBlockType } from '@wordpress/blocks';

const attributes = {
	tabLink: {
		type: "string",
		default: "tab 1"
    },
    tabContent: {
		type: "string",
		default: "tab 1 content"
	},

};

registerBlockType( 'hoora/tab', {
    title: 'hoora tab',
    category: 'hoora',
    attributes,
    edit( { className, attributes, clientId , setAttributes} ) {
        const TabContext = React.createContext();

        const Tabs = props => {
            const { children, defaultTab } = props;
            const [activeTab, setActiveTab] = React.useState(defaultTab);

            return (
                <TabContext.Provider value={{ activeTab, setActiveTab }}>
                {children}
                </TabContext.Provider>
            );
        };

        const Tab = props => {
            const { activeTab, setActiveTab } = React.useContext(TabContext);
            const { label, tabIndex } = props;
            const active = activeTab === tabIndex;

            return (
                <li
                onClick={() => setActiveTab(tabIndex)}
                className={`tabs-tab ${active ? "active" : ""}`}
                >
                {" "}
                {label}{" "}
                </li>
            );
        };

        const TabPane = props => {
            const { activeTab } = React.useContext(TabContext);
            const { children, tabIndex } = props;

            if (activeTab === tabIndex) {
                return <div className="tabs-tab-pane">{children}</div>;
            } else {
                return null;
            }
        };
        return(
                <div className="App">
                    <Tabs defaultTab={0}>
                        <div className="tabs">
                        <Tab label="Home" tabIndex={0} />
                        <Tab label="Contact" tabIndex={1} />
                        </div>

                        <TabPane tabIndex={0}>Tab Content for Home</TabPane>
                        <TabPane tabIndex={1}>Tab Content for Contact</TabPane>
                    </Tabs>
                </div>
            // <div>edit</div>
        )
    },

    save({attributes,className}) {
        const {
            tabLink,
            tabContent
        } = attributes;
        return (
            <div className={'hoora-tab-save'}>
                <p>Tab panel</p>
                <div class="container">

                    <ul class="tabs">
                        <li class="tab-link current" data-tab="tab-1">{tabLink}</li>
                        <li class="tab-link" data-tab="tab-2">Tab Two</li>
                        {/* <li class="tab-link" data-tab="tab-3">Tab Three</li>
                        <li class="tab-link" data-tab="tab-4">Tab Four</li> */}
                    </ul>
                    
                    <div className="tab-panel">
                        <div id="tab-1" class="tab-content current">
                            {tabContent}
                        </div>
                        <div id="tab-2" class="tab-content">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                        {/* <div id="tab-3" class="tab-content">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </div>
                        <div id="tab-4" class="tab-content">
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div> */}
                    </div>

                </div>
            </div>
        );
    },
} );