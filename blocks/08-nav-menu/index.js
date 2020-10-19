/**
 * Block dependencies
 */
import Edit from './edit';
import icon from './icon';
// import attributes from './attributes';
import './style.scss';
import apiFetch from '@wordpress/api-fetch';
// import ServerSideRender from '@wordpress/server-side-render';



const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    RichText,
} = wp.editor;


const attributes = {
    selectControl: {
        type: 'string',
    },
};
// function getSettings(attributes) {
//     let settings = [];
//     for (let attribute in attributes) {
//         let value = attributes[attribute];
//         // console.log(value);
//         if ('boolean' === typeof attributes[attribute]) {
//             value = value.toString();
//         }
//         settings.push(<li>{attribute}: {value}</li>);
//     }
//     return settings;
// }

function getSettings(attributes) {
    let value;
    for (let attribute in attributes) {
        value = attributes[attribute];
        if ('boolean' === typeof attributes[attribute]) {
            value = value.toString();
        }
    }
    console.log(value);
    return value;
}


/**
 * Register static block example block
 */
export default registerBlockType(
    'jsforwpblocks/form-fields',
    {
        title: __('Example - Form Fields', 'jsforwpblocks'),
        description: __('An example of how to use form component in a block.', 'jsforwpblocks'),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },
        keywords: [
            __('Palette', 'jsforwpblocks'),
            __('Settings', 'jsforwpblocks'),
            __('Scheme', 'jsforwpblocks'),
        ],
        attributes,
        edit: props => {
            const { setAttributes } = props;
            return [
                <Edit {...{ setAttributes, ...props }} />
            ];
        },
        save: props => {
            return null;
        },
    },
);
