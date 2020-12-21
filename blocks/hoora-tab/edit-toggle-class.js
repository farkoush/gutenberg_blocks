const { Component, Fragment } = wp.element;
const { TextControl, Panel, PanelBody,PanelRow,RangeControl, Button } = wp.components;
const { InspectorControls, 	MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
import { more } from '@wordpress/icons';

export default class Edit extends Component {   
    render() {
        const { attributes, className, setAttributes, isSelected } = this.props;
        const handleCheck = (e) => {
            console.log('eee' + e.target);
            setAttributes({activeClasses : ! attributes.activeClasses});
            // console.log('handeled ' + attributes.activeClasses);
        };
        function MyButtonBlockAppender( { rootClientId } ) {
            return (
                <Inserter
                    rootClientId={ rootClientId }
                    renderToggle={ ( { onToggle, disabled } ) => (
                        <IconButton
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
        return[
        <div>
            <div className="container">
                    <ul className="tabs">
                        <li className={attributes.activeClasses ? "tab-link current" : "tab-link"} data-tab="tab-1" onClick={handleCheck} >
                            {/* {console.log("ddd"+ attributes.tabLink )} */}
                            {/* <TextControl
                                label="tabLink"
                                value={attributes.tabLink}
                                onChange={(tabLink) => setAttributes({tabLink })}
                            /> */}
                            Tab One
                        </li>
                        <li className={attributes.activeClasses ? "tab-link current" : "tab-link"} data-tab="tab-2" onClick={handleCheck} >Tab Two</li>
                        {/* <li class="tab-link" data-tab="tab-3">Tab Three</li>
                        <li class="tab-link" data-tab="tab-4">Tab Four</li> */}
                    </ul>

                    <div id="tab-1" className="tab-content current">
                            {/* <TextControl
                                label="tabContent"
                                value={attributes.tabContent}
                                onChange={(tabContent) => setAttributes({tabContent })}
                            />                     */}
                            fasfasdfasd
                    </div>
                    <div id="tab-2" className="tab-content">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    {/* <div id="tab-3" class="tab-content">
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </div>
                    <div id="tab-4" class="tab-content">
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div> */}

                </div>
        </div>
        ]
      }
}
