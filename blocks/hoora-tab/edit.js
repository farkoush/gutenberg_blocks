const { Component, Fragment } = wp.element;
const { TextControl, Panel, PanelBody,PanelRow,RangeControl, Button, TabPanel } = wp.components;
const { InspectorControls, 	MediaUpload, MediaUploadCheck, InnerBlocks, Inserter, InnerBlocks } = wp.blockEditor;
import { more } from '@wordpress/icons';

export default class Edit extends Component {   
    render() {
        const { attributes, className, setAttributes, isSelected } = this.props;
    
        const onSelect = ( tabName ) => {
            console.log( 'Selecting tab', tabName );
        };
        // const blocksTab = {
        //     name: 'blocks',
        //     /* translators: Blocks tab title in the block inserter. */
        //     title: __( 'Blocks' ),
        // };
        // const tabs = [ blocksTab ];

        // if ( showPatterns ) {
        //     tabs.push( blocksTab );
        // }
        const renderTab = ( tab ) => {
            if ( 'show' === tab.name ) {
                return getPlotWidget();
            } else if ( 'edit' === tab.name ) {
                return getEditorWidget();
            }
        };

        const doStuff = () => {
            // does some unrelated stuff...
            console.log('doStuff');
        };

        const getPlotWidget = () => {
            // returns a component...
            console.log('getPlotWidget');

        };

        const getEditorWidget = (tab) => {
            // const { attributes } = this.props;
            const { tabLink } = attributes;
            return (
                <div className="ggggggggggggggg">
                    <p>{tab}</p>
                            <TextControl
                                label= 'tabLink' 
                                value = 'ttttt'
                                // value={ tabLink }
                                onChange={ tabLink => setAttributes( { tabLink } ) }
                            />
                            <Button
                                isDefault
                                onClick={() => {
                                    doStuff();            
                                    console.log('doStuff');

                                    // resetBlocks([]);
                                    // insertBlocks(layout);
                                    // setState({ isOpen: false });
                                }}
                                > 
                                run
                            </Button>
                </div>
            )
        };

        return (
            <div className={ className }>
               <TabPanel className="my-tab-panel"
                    activeClass="active-tab"
                    onSelect={ onSelect }
                    tabs={ [
                        {
                            name: 'show',
                            title: 'Tab 1',
                            className: 'tab-one',
                        },
                        {
                            name: 'edit',
                            title: 'edit',
                            className: 'tab-two',
                        },
                    ] }
                    // tabs={ tabs }
                    // onSelect={ onSelect }
                >
                    {
                        // ( tab ) => <p>{ tab.title }</p>
                        ( tab ) => {  getEditorWidget( tab ) }
                        // ( tab ) => {  renderTab( tab ) }
                    }
                    {/* { children } */}
                </TabPanel>
            </div>
        );
      }
}
