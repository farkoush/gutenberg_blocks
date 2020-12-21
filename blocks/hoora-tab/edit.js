const { Component } = wp.element;
const { createContext, useContext, useState } = wp.element;
const { TextControl, Button } = wp.components;
const { InnerBlocks, Inserter } = wp.blockEditor;

function MyButtonBlockAppender( { rootClientId } ) {
    return (
        <Inserter
            rootClientId={ rootClientId }
            renderToggle={ ( { onToggle, disabled } ) => (
                <Button
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

export default class Edit extends Component {   
    render() {
        const { attributes, className, setAttributes, isSelected, clientId } = this.props;
    
        // const TabContext = React.createContext();
        // const {activeTab,defaultTab } = attributes
        const TabContext = createContext();
        
        const Tabs = props => {
            const { children, defaultTab } = props;
            const [activeTab, setActiveTab] = useState(defaultTab);
            // setAttributes({activeTab: defaultTab});

            return (
                <TabContext.Provider value={{ activeTab, setActiveTab }}>
                {/* <TabContext.Provider value={activeTab}> */}
                    {children}
                </TabContext.Provider>
            );
        };

        const Tab = props => {
            const { activeTab, setActiveTab } = useContext(TabContext);
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
            const { activeTab } = useContext(TabContext);
            const { children, tabIndex } = props;

            if (activeTab === tabIndex) {
                return <div className="tabs-tab-pane">{children}</div>;
            } else {
                return null;
            }
        };

        

        return (
            <div className="App">
                {/* defaultTab = {attributes.defaultTab} */}
                <Tabs defaultTab={0}> 
                    <div className="tabs">
                        <Tab label="Home" tabIndex={0} />
                        <Tab label="Contact" tabIndex={1} />
                    </div>
                    <TabPane tabIndex={0}>
                            <InnerBlocks
                                allowedBlocks={['hoora/tabpane']}
                                template={[['hoora/tabpane']]}
                                renderAppender={ () => (
                                    <MyButtonBlockAppender rootClientId={ clientId } />
                                ) }
                            />
                    </TabPane>

                    <TabPane tabIndex={1}>Tab Content for Contact</TabPane>
                </Tabs>
            </div>
        );
      }
}
