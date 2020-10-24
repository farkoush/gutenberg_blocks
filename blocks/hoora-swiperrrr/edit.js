/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { SelectControl, TabPanel, NavigableMenu, TabbableContainer, Button } = wp.components;
const { RichText, MediaUpload, MediaUploadCheck,  PlainText } = wp.editor;


export default class Edit extends Component {
    constructor() {
        super( ...arguments );
        // this.state = {
        //     data: [],
        //   };
    }
    // componentDidMount() {
    // }
    render() {
        const {
            attributes: { imgID, imageAlt, imageUrl },
            className, setAttributes  } = this.props;
            // const { data } = this.state;
            const onSelect = ( tabName ) => {
                console.log( 'Selecting tab', tabName );
            };
            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imageUrl: img.url,
                    imageAlt: img.alt,
                } );
            };
            const getImageButton = (openEvent) => {
                if(imageUrl) {
                    return (
                        <img
                            src={ imageUrl }
                            onClick={ openEvent }
                            className="image"
                        />
                    );
                }
                else {
                    return (
                        <div className="button-container">
                            <Button
                                onClick={ openEvent }
                                className="button button-large"
                            >
                                Pick an image
                            </Button>
                        </div>
                    );
                }
            };
            let renderTab = (tab) => {
                // console.log(tab);
                // switch (tab.name) {
                //     case "tab1":
                    return <div>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ onSelectImage }
                                allowedTypes={ ['image'] }
                                // allowedTypes={ ALLOWED_MEDIA_TYPES }
                                value={ imgID }
                                render={({ open }) => getImageButton(open) }
                            />
                        </MediaUploadCheck>
                      </div>
                //   case "tab2":
                //     return <div>
                      
                //     </div>
                }
            //     return tab.name
            //   }
            return (
                <div className={ className }>
                    <div>
                        <TabPanel className="my-tab-panel"
                                activeClass="active-tab"
                                onSelect={ onSelect }
                                tabs={ [
                                    {
                                        name: 'tab1',
                                        title: 'Tab 1',
                                        className: 'tab-one',
                                        last : 'fffff',
                                    },
                                    {
                                        name: 'tab2',
                                        title: 'Tab 2',
                                        className: 'tab-two',
                                    },
                                ] }>
                                {
                                    ( tab ) => renderTab(tab)
                                }
                            </TabPanel>
                    </div>
            </div>
        );
    }
}
