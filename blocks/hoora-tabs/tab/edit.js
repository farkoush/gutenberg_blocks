const { TextControl, PanelBody, PanelRow } = wp.components;
const { InnerBlocks,InspectorControls, useBlockProps   } = wp.blockEditor;
const { Component } = wp.element;




export default class Edit extends Component {  
    getInspectorControls(){
        const {attributes, setAttributes, isSelected} = this.props;

            return (
                isSelected && (
                    <InspectorControls style={{marginBottom: '40px'}}>  
                    <PanelBody title={"tab Settings"}>
                        <PanelRow>
                            <TextControl
                                label="title"
                                value={attributes.tabTitle}
                                onChange={option => {
                                    setAttributes({ tabTitle: option });
                                }}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label="tabIndex"
                                value={attributes.tabIndex}
                                onChange={tabIndex => {
                                    setAttributes({ tabIndex: tabIndex });
                                }}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                )
            );
        }
     
        getBlockControls(){
            const { attributes, setAttributes } = this.props;
            return (
                <InspectorControls>              
                </InspectorControls>
            );
        }
    render() {
        const { attributes, className, setAttributes, isSelected, clientId } = this.props;
        // const blockProps = useBlockProps();
        // const Tab = props => {
        //     const active = attributes.activeTab === props.tabIndex;
        //     console.log('activ' + active)
        //     return (
        //         <div>
        //             <li
        //                 onClick={() => {setAttributes({activeTab: props.tabIndex}); }} //setAttributes actoiveTab : tabIndex 
        //                 className={`tabs-tab ${isSelected ? "active" : ""}`}
        //             >
        //                 {" "}
        //                 {props.label}{" "}
        //             </li>
        //             <div
        //                 className={`tabs-tab-pane ${!isSelected ? "hide" : ""}`}
        //             >
        //                 {props.children}
        //             </div>
        //         </div>
        //     );
        // };
        const TabPane = props => {
            const { children, tabIndex } = props;
    
            if (attributes.activeTab === tabIndex) {
                // return <div className="tabs-tab-pane">{children}</div>;
                return <div className={`tabs-tab-pane ${tabIndex}`}>{children}</div>;
            } else {
                return null;
            }
        };
        return ([
            this.getInspectorControls(),
            this.getBlockControls(),
            // <div { ...blockProps } tabIndex={attributes.tabIndex}>
            // <div tabIndex={attributes.tabIndex} label={attributes.tabTitle}>
            //     <p>{attributes.tabIndex}</p>
            //     {/* <p>{attributes.tabTitle}</p> */}
            //     <InnerBlocks
            //         allowedBlocks={['core/group']}
            //         template={[['core/group']]}
            //     />
            // </div>
            // <div tabIndex={attributes.tabIndex} label={attributes.tabTitle}>
            //     <div >Tab Content for Contact</div>
            // </div>
            <TabPane tabIndex={attributes.tabIndex}>

                <InnerBlocks
                    allowedBlocks={['core/group']}
                    template={[['core/group']]}
                />

            </TabPane>

        ]);
    }
}
