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
                <div>
                    <li
                        onClick={() => {setAttributes({activeTab: props.tabIndex}); }} //setAttributes actoiveTab : tabIndex 
                        className={`tabs-tab ${active ? "active" : ""}`}
                    >
                        {" "}
                        {props.label}{" "}
                    </li>
                    <div
                        className={`tabs-tab-pane ${!active ? "hide" : ""}`}
                    >
                        {props.children}
                    </div>
                </div>
            );
        };

        // const TabPane = props => {
        //     const { children, tabIndex } = props;

        //     if (attributes.activeTab === tabIndex) {
        //         // return <div className="tabs-tab-pane">{children}</div>;
        //         return <div className={`tabs-tab-pane ${tabIndex}`}>{children}</div>;
        //     } else {
        //         return null;
        //     }
        // };

        return (
            <div className="App">
                <div defaultTab={0}> 
                    <div className="tabs">
                        <Tab tabIndex={0} label="Homeeee" > 
                            <div >home Content</div>
                        </Tab>
                        <Tab tabIndex={1} label="Contact">
                            <div >Tab Content for Contact</div>
                        </Tab>
                        <Tab tabIndex={2} label="About">                    
                            <div >About Content</div>
                        </Tab>
                    </div>
                </div>
            </div>
        );
      }
}
