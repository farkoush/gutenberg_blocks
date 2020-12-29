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
                <div className="hhhh">
                    <Button
                        className="my-button-block-appender"
                        onClick={ onToggle }
                        disabled={ disabled }
                        label="Add a New Item"
                        icon="plus"
                    />
                </div>
            ) }
            isAppender
        />
    );
};
export default class Edit extends Component {   
    componentDidMount(previousProps, previousState){
        // console.log('this.props.clientId' + this.props.clientId + "  name::" + this.props.name)
        var tabs_title_arr = [];
        var tabs_content_arr = [];
        var clientId = this.props.clientId;
        var myBlock = wp.data.select('core/block-editor').getBlock(clientId);
        myBlock.innerBlocks.map( (block,index) => {
             tabs_title_arr.push( block.attributes.tabTitle );
             tabs_content_arr.push(block.attributes.tabContent)
            //  console.log(block);
            //  console.log(index);
        });
        this.props.setAttributes({ tabstitle: tabs_title_arr });
        this.props.setAttributes({tabsContent : tabs_content_arr});

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
    
        // const TabPane = props => {
        //     const { children, tabIndex } = props;
    
        //     if (attributes.activeTab === tabIndex) {
        //         // return <div className="tabs-tab-pane">{children}</div>;
        //         return <div className={`tabs-tab-pane ${tabIndex}`}>{children}</div>;
        //     } else {
        //         return null;
        //     }
        // };
        if (attributes.tabstitle === 'undefined')    {
            console.log('undefined')
        }

        return (
            <div className="App">
                <div defaultTab={0}> 
                    <div className="tabs">
                        <div className="tabs jjjjjjjjjjjjjjjj">
                            {
                                if (attributes.tabstitle) {

                                    var tab = attributes.tabstitle.map((answer, i) => {     
                                        console.log("Entered");                 
                                        // Return the element. Also pass key     
                                        return (<Tab key={answer} answer={answer} />) 
                                     })                      
                                }
                            }
                            {/* <Tab tabIndex={1} ><p>Contact</p></Tab>
                            <Tab tabIndex={2} ><p>About</p></Tab> */}
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
                        {/* <TabPane tabIndex={0}>Tab Content for home</TabPane>
                        <TabPane tabIndex={1}>Tab Content for Contact</TabPane>
                        <TabPane tabIndex={2}>About</TabPane>  */}
                            <InnerBlocks
                                allowedBlocks={['hoora/tab']}
                                template={[
                                    ['hoora/tab', {level: 2, tabindex:1, content:[]}]
                                ]}
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
