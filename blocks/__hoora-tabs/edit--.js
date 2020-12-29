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
            // isAppender
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
             console.log(block);
             console.log(index);
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
    
        const TabPane = props => {
            const { children, tabIndex } = props;
    
            if (attributes.activeTab === tabIndex) {
                // return <div className="tabs-tab-pane">{children}</div>;
                return <div className={`tabs-tab-pane ${tabIndex}`}>{children}</div>;
            } else {
                return null;
            }
        };
        // const INNER_BLOCKS_TEMPLATE = [
        //     [
        //         'hoora/tab',
        //         {
        //             className: 'aquila-dos-and-donts__groupjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
        //         },
        //     ],
        // ];
        // const ALLOWED_BLOCKS = [ 'hoora/tab' ];
        return (
            <div className="App">
                <div defaultTab={0}> 
                    <div className="tabs">
                            <InnerBlocks
                                allowedBlocks={['hoora/tab']}
                                template={[
                                    ['hoora/tab', {className:'tabsssss'}]
                                ]}
                                // template={ INNER_BLOCKS_TEMPLATE }
				                // allowedBlocks={ ALLOWED_BLOCKS }
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
