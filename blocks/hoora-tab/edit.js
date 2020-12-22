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
        const layouts = {
            default: [createBlock("core/paragraph", {})],
            hero: [
              createBlock("core/cover", { align: "full" }),
              createBlock("core/button", {
                text: "Layout Switcher",
                align: "center"
              }),
              createBlock("core/columns", { columns: 3 })
            ],
          };
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
                    <div className="tabs">
                        <Tab tabIndex={0} ><p>Homeeee</p></Tab>
                        <Tab tabIndex={1} ><p>Contact</p></Tab>
                        <Tab tabIndex={2} ><p>About</p></Tab>
                        {/* <AddControls layout={layouts.hero} /> */}

                        {/* <div tabIndex={0} onClick = {e => console.log(e)}><p>Homeeee</p></div>
                        <div tabIndex={1} onClick = {e => console.log(e)} ><p>Contact</p></div>
                        <div tabIndex={2} onClick = {e => console.log(e)} ><p>About</p></div> */}
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
                </div>
            </div>
        );
      }
}
