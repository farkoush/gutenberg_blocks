const { Component } = wp.element;
const { createContext, useContext, useState } = wp.element;
const { TextControl, Button } = wp.components;
const { InnerBlocks, Inserter } = wp.blockEditor;
const { createBlock } = wp.blocks;


// import ResetControls from "./components/ResetControls";
// import AddControls from "./components/AddControls";


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
        const Tab = props => {
            const active = attributes.activeTab === props.tabIndex;
            console.log('activ' + active)
            return (
                <li
                    onClick={() => {setAttributes({activeTab: props.tabIndex}); }} //setAttributes actoiveTab : tabIndex 
                    className={`tabs-tab ${active ? "active" : ""}`}
                >
                    {" "}
                    {props.children}{" "}
                </li>
            );
        };
    
        const TabPane = props => {
            const { children, tabIndex } = props;
    
            if (attributes.activeTab === tabIndex) {
                // return <div className="tabs-tab-pane">{children}</div>;
                return <div className={`tabs-tab-pane ${tabIndex}`}>{children}</div>;
            } else {
                return null;
            }
        };
        return (
            <div className="App">
                <div defaultTab={0}> 
                    <div className="tabs jjjjjjjjjjjjjjjj">
                        <Tab tabIndex={0} >
                            <p>Homeeee</p>
                            {/* <TextControl
                                label="tabContent"
                                value={attributes.tabsTitle}
                                onChange={(tabContent) => setAttributes({tabContent })}
                            />     */}
                        </Tab>
                        <Tab tabIndex={1} ><p>Contact</p></Tab>
                        <Tab tabIndex={2} ><p>About</p></Tab>
                        {/* <AddControls layout={layouts.hero} /> */}
                
                    </div>
                    {/* <TabPane tabIndex={0}>
                            <InnerBlocks
                                allowedBlocks={['hoora/tabpane']}
                                template={[['hoora/tabpane']]}
                                renderAppender={ () => (
                                    <MyButtonBlockAppender rootClientId={ clientId } />
                                ) }
                            />
                    </TabPane> */}
                    <TabPane tabIndex={0}>Tab Content for home
                            <InnerBlocks
                                allowedBlocks={['hoora/tabpane']}
                                template={[['hoora/tabpane']]}
                                renderAppender={ () => (
                                    <MyButtonBlockAppender rootClientId={ clientId } />
                                ) }
                            />
                    </TabPane>
                    <TabPane tabIndex={1}>Tab Content for Contact
                            <InnerBlocks
                                allowedBlocks={['hoora/tabpane']}
                                template={[['hoora/tabpane']]}
                                renderAppender={ () => (
                                    <MyButtonBlockAppender rootClientId={ clientId } />
                                ) }
                            />
                    </TabPane>
                    <TabPane tabIndex={2}>About
                            <InnerBlocks
                                allowedBlocks={['hoora/tabpane']}
                                template={[['hoora/tabpane']]}
                                renderAppender={ () => (
                                    <MyButtonBlockAppender rootClientId={ clientId } />
                                ) }
                            />
                    </TabPane> 
                </div>
            </div>
        );
      }
}
