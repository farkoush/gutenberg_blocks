// import Edit from "../gallery/edit";

const {registerBlockType} = wp.blocks;
const {TextControl,TextareaControl, Button} = wp.components;
const { Inserter,InnerBlocks } = wp.blockEditor;
const { dispatch } = wp.data;
import EditItem from './edit-item';
import Edit from './edit';
// import SingleBlockTypeAppender from './single-block-type-appender.js'

registerBlockType( 'hoora/sourceitem', {
    title: 'Source Item',
    icon: 'edit',
    category: 'hoora',
    parent: 'hoora/source',
    attributes: {
        source_attr  : {
            type : 'object',
            source: 'meta',
            meta: '_meta_source',
            // default: {
            //     titleee:'',
            //     linkkk:''
            // }
        },
        id:{
            type:'number'
        },
        valuesObj: {
            type: 'object',
            default: {},
        }, 

        trim_levels:{
            type: 'array',
            source: 'meta',
            meta: 'trim_levels',
        },

        metas:{
            type: 'array',
            source: 'meta',
            meta: 'metas',
        }

        // Add two new attributes
    },
    edit:EditItem,
    save: ( {attributes} ) => {
        return (
            <div>
                <p>Meta source_meta</p>
                {/* <p>{props.attributes.title}</p> */}
            </div>
        );
    }
} );

registerBlockType( 'hoora/source', {
    title: 'Source Meta Block',
    icon: 'edit',
    category: 'hoora',
    supports: {
		multiple: false,
	},

    edit: Edit,
    save: () => {
        return (<InnerBlocks.Content />);
    }
} );

