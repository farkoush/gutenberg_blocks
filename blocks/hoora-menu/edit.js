/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { SelectControl } = wp.components;
import apiFetch from '@wordpress/api-fetch';

export default class Edit extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            data: [],
          };
    }
    componentDidMount() {
        wp.apiFetch( { path: '/menus/v1/menus' } ).then( menus => { this.setState({data : menus});}); 
    }
    render() {
        const {
            attributes: { selectControl },
            className, setAttributes  } = this.props;
            const { data } = this.state;
            return (
                <div className={ className }>
                <SelectControl
                    label= 'انتخاب منو' 
                    value = { selectControl }
                    options = { data.map(({id, name}) => ({label: name, value: id}) ) }
                    onChange = { selectControl => setAttributes( { selectControl } ) }
                />
            </div>
        );
    }
}
