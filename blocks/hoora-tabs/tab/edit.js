const { TextControl, Panel, PanelBody,PanelRow,RangeControl, Button } = wp.components;
const { InnerBlocks, Inserter } = wp.blockEditor;
const { Component } = wp.element;


export default class Edit extends Component {   
    componentDidMount(previousProps, previousState){
        // console.log('this.props.clientIddddddd' + this.props.clientId+ "  name::" + this.props.name)
        var tabs_content = [];
        var myID = this.props.clientId;
        var myBlock = wp.data.select('core/block-editor').getBlock(myID);
        myBlock.innerBlocks.map(block => {
            tabs_content.push(block.attributes.content)
            // console.log(block)
        });
        // this.props.setAttributes({ 'tabs_title': tabs_title });
        this.props.setAttributes({content : tabs_content })
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
                setAttributes({content: children})
                return <div className={`tabs-tab-pane ${tabIndex}`}>{children}</div>;
            } else {
                return null;
            }
        };
  return (
      <div>
          {/* <div className="tabs jjjjjjjjjjjjjjjj"> */}
              <li className="tabs-tab" tabIndex={0} >
                    <p>Homeeee</p>
                    <TextControl
                        label="tabContent"
                        value={attributes.title}
                        onChange={(title) => setAttributes({title})}
                    />  
                    {/* {console.log(attributes.content)} */}
                </li>
              {/* <Tab tabIndex={1} ><p>Contact</p></Tab>
              <Tab tabIndex={2} ><p>About</p></Tab> */}
              {/* <AddControls layout={layouts.hero} /> */}
      
          {/* </div> */}
          <div className="tabs-tab-pane" tabIndex={0}>Tab Content for home
                <InnerBlocks
                    allowedBlocks={['core/paragraph']}
                    template={[['core/paragraph']]}
                />
          </div>
          {/* <TabPane tabIndex={1}>Tab Content for Contact</TabPane>
          <TabPane tabIndex={2}>About</TabPane>  */}
      </div>
  );
}
}
