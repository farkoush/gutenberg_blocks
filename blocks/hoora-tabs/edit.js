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
};
export default class Edit extends Component {   
    componentDidMount(previousProps, previousState){
        // console.log('this.props.clientId' + this.props.clientId + "  name::" + this.props.name)
        var tabs_title = [];
        var tabs_content = [];
        var myID = this.props.clientId;
        var tabs_title = [];
        var myBlock = wp.data.select('core/block-editor').getBlock(myID);
        myBlock.innerBlocks.map(block => {
             tabs_title.push( block.attributes.title );
             tabs_content.push(block.attributes.content)
        });
        this.props.setAttributes({ 'tabs_title': tabs_title });
        this.props.setAttributes({'tabsContent' : tabs_content})
    }
    
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
        const Tabs = props => {
            const {children} = props;
            var tabs_title = [];
            var tabs_content = [];
            // console.dir(children); 
            var myBlock = wp.data.select('core/block-editor').getBlock(clientId);
            myBlock.innerBlocks.map(block => {
                 tabs_title.push( block.attributes.title );
                 tabs_content.push ( block.attributes.content)
            });
            return <div>gggggg{tabs_title} {}</div>;
        }
        return (
            <div className="App">
                <div defaultTab={0}> 
                    <div className="tabs jjjjjjjjjjjjjjjj">
                        {console.log('attributes.tabs_title')}
                        {console.log( attributes.tabs_title)}
                        {console.log('attributes.tabs_content')}
                        {console.log(attributes.tabsContent)}
                        {/* {console.log('attributes.tabs_content' + attributes.tabs_content)} */}
                            <InnerBlocks
                                allowedBlocks={['hoora/tab']}
                                template={[['hoora/tab']]}
                                renderAppender={ () => (
                                    <MyButtonBlockAppender rootClientId={ clientId } />
                                ) }
                            />
                    </div>
                </div>
            </div>
        );
      }
}
