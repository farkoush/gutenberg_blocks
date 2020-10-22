/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { SelectControl, TabPanel, NavigableMenu, TabbableContainer, Button } = wp.components;


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
            attributes: { selectControl },
            className, setAttributes  } = this.props;
            // const { data } = this.state;
            const onSelect = ( tabName ) => {
                console.log( 'Selecting tab', tabName );
            };
            return (
                <div className={ className }>
                    <TabPanel className="my-tab-panel"
                            activeClass="active-tab"
                            onSelect={ onSelect }
                            tabs={ [
                                {
                                    name: 'tab1',
                                    title: 'Tab 1',
                                    className: 'tab-one',
                                },
                                {
                                    name: 'tab2',
                                    title: 'Tab 2',
                                    className: 'tab-two',
                                },
                            ] }>
                            {
                                ( tab ) => <p>{ tab.title }</p>
                            }
                        </TabPanel>
            </div>
        );

        // function onNavigate( index, target ) {
        //     console.log( `Navigates to ${ index }`, target );
        // }
        // return(

        //     // const MyNavigableContainer = () => (
        //         <div>
        //             <span>Navigable Menu:</span>
        //             <NavigableMenu onNavigate={ onNavigate } orientation="horizontal">
        //                 <Button isSecondary>Item 1</Button>
        //                 <Button isSecondary>Item 2</Button>
        //                 <Button isSecondary>Item 3</Button>
        //             </NavigableMenu>
                    
        //             <span>Tabbable Container:</span>
        //             <TabbableContainer onNavigate={ onNavigate }>
        //                 <Button isSecondary tabIndex="0">Section 1</Button>
        //                 <Button isSecondary tabIndex="0">Section 2</Button>
        //                 <Button isSecondary tabIndex="0">Section 3</Button>
        //                 <Button isSecondary tabIndex="0">Section 4</Button>
        //             </TabbableContainer>
        //         </div>
        //     // );
        // );
    }
}
