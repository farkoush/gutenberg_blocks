const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { Button, Modal } = wp.components;
const { withDispatch } = wp.data;
const { compose, withState } = wp.compose;
const { createBlock } = wp.blocks;


const Edit = ({attributes,setAttributes ,clientId
}) => {
    // const layouts = {
    //     default: [createBlock("core/paragraph", {})],
    //     hero: [
    //       createBlock("core/columns", { columns: 3 })
    //     ],
    //     tabs: [
    //         createBlock("core/group",{className: 'ggggggggggggg'}, [
    //             createBlock("hoora/tabitem", { align: "full" }),
    //             createBlock("hoora/tabpane", {
    //             align: "center"
    //             }),
    //         ]
            
    //         ),
    //         // createBlock("core/columns", { columns: 3 })
    //       ],
    //   };
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
      <div>
          <div className="tabs jjjjjjjjjjjjjjjj">
              <Tab tabIndex={0} ><p>Homeeee</p></Tab>
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
          <TabPane tabIndex={0}>Tab Content for home</TabPane>
          <TabPane tabIndex={1}>Tab Content for Contact</TabPane>
          <TabPane tabIndex={2}>About</TabPane> 
      </div>
  );
};
export default Edit;