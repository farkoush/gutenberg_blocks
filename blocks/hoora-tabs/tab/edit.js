const { TextControl } = wp.components;
const { InnerBlocks } = wp.blockEditor;
const { Component } = wp.element;


export default class Edit extends Component {  
    render() {
        const { attributes, className, setAttributes, isSelected, clientId } = this.props;
        return (
            <div>
                    <li className="tabs-tab" tabIndex={0} >
                        <p>Homeeee</p>
                        <TextControl
                            label="tabtitle"
                            value={attributes.tabTitle}
                            onChange={(tabTitle) => setAttributes({tabTitle})}
                        />  
                    </li>
                    <div className="tabs-tab-pane" tabIndex={0}>Tab Content for home
                            {/* <InnerBlocks
                                allowedBlocks={['core/paragraph']}
                                template={[['core/paragraph']]}
                            /> */}
                        <TextControl
                            label="tabContent"
                            value={attributes.tabContent}
                            onChange={(tabContent) => setAttributes({tabContent})}
                        /> 
                    </div>
            </div>
        );
    }
}
