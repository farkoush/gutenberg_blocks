const { TextControl } = wp.components;
const { InnerBlocks } = wp.blockEditor;
const { Component } = wp.element;


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
        return (
            <div>
                        {/* <TextControl
                            label="tabtitle"
                            value={attributes.tabTitle}
                            onChange={(tabTitle) => setAttributes({tabTitle})}
                        />  
                        <TextControl
                            label="tabContent"
                            value={attributes.tabContent}
                            onChange={(tabContent) => setAttributes({tabContent})}
                        />  */}
                        
                        <Tab tabIndex={1} label="Contact">
                            <div >Tab Content for Contact</div>
                        </Tab>
            </div>
        );
    }
}
