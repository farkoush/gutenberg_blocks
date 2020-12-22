const { Component } = wp.element;
const { createContext, useContext, useState } = wp.element;
const { TextControl, Button } = wp.components;
const { InnerBlocks, Inserter } = wp.blockEditor;

// import Tabs from "./components/Tabs";
// import Tab from "./components/Tab";
// import TabPane from "./components/TabPane"

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
        const {activeTab} = attributes
        // const TabContext = React.createContext();
        // const {activeTab,defaultTab } = attributes
        const TabContext = createContext();
        
        const Tabs = props => {
            const { children, defaultTab } = props;
            // const [activeTab, setActiveTab] = useState(defaultTab);


            // const [count, setCount] = useState(0); EQUAL   
            // constructor(props) {
            //     super(props);
            //     this.state = {
            //       count: 0
            //     };
            //   }

            // {count} EQUAL {this.state.count}

            // <button onClick={() => setCount(count + 1)}> EQUAL 
            // <button onClick={() => this.setState({ count: this.state.count + 1 })}>


            // setAttributes({activeTab: defaultTab});

            return (
                <TabContext.Provider value={{ activeTab, setActiveTab }}>
                {/* <TabContext.Provider value={activeTab}> */}
                {console.log("ddd" + activeTab)}
                    {children}
                </TabContext.Provider>
            );
        };

        const Tab = props => {
            const { activeTab, setActiveTab } = useContext(TabContext);
            // const { label, tabIndex } = props;
            // const { children, tabIndex } = props;
            const active = activeTab === props.tabIndex;
            console.log('activ' + active)
            return (
                <li
                    onClick={() => {setActiveTab(props.tabIndex); }} //setAttributes actoiveTab : tabIndex 
                    //onClick={(index) => setActiveTab(index)} //setAttributes actoiveTab : tabIndex 

                    className={`tabs-tab ${active ? "active" : ""}`}
                >
                    {" "}
                    {props.children}{" "}
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
                        <Tab tabIndex={0} ><p className="tab-title">Home</p></Tab>
                        <Tab tabIndex={1} ><p className="tab-title">Contact</p></Tab>
                        <Tab tabIndex={2} ><p className="tab-title">About</p></Tab>

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
                    <TabPane tabIndex={2}>About</TabPane>
                </Tabs>
            </div>
        );
      }
}
