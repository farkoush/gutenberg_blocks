/**
 * Block dependencies
 */
import Edit from './edit';
const { registerBlockType } = wp.blocks;

const attributes = {
    selectControl: {
        type: 'string',
    },
};

export default registerBlockType(
    'hoora/menu',
    {
        title: 'hoora Menu',
        category: 'common',
        icon: 'smiley',
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
