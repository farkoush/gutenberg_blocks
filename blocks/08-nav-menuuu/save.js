/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    SelectControl
} = wp.components;
import apiFetch from '@wordpress/api-fetch';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Save extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            data: [],
            items: [],
          };
    }
    componentDidMount() {
        // wp.apiFetch( { path: '/menus/v1/menus' } ).then( menus => { this.setState({data : menus});}); 
        wp.apiFetch( { path: '/menus/v1/menus/test-menu' } ).then( menuItems => { this.setState({items : menuItems});}); 
    }
    render() {
        const {
            attributes: { selectControl },
            className, setAttributes  } = this.props;
            const { data } = this.state;
            data.forEach(menu => {
                console.log(menu)
            });
            return (
                <div className={ className }>
                <SelectControl
                    label={ __( 'Select Control', 'jsforwpblocks' ) }
                    value={ selectControl }
                    options={data.map(({id, name}) => ({label: name, value: id}))}
                    onChange={ selectControl => setAttributes( { selectControl } ) }
                />
            </div>
        );
    }
}
