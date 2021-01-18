// import Edit from "../gallery/edit";

const {registerBlockType} = wp.blocks;
const { InnerBlocks } = wp.blockEditor;
import EditItem from './edit-item';
import Edit from './edit';

registerBlockType( 'hoora/sourceitem', {
    title: 'Source Item',
    icon: 'edit',
    category: 'hoora',
    parent: 'hoora/source',
    attributes: {
        source_attr  : {
            type : 'object',
            default:
                {
                    sourceTitle: '',
                    sourceLink: '',
                }
        },
        idx:{
            type:'number',
            default:0
        },
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
    attributes:{
        items:{
            type: 'array',
            source: 'meta',
            meta: 'metas',
            default: []
        },
    },
    edit: Edit,
    save: () => {
        return (<InnerBlocks.Content />);
    }
} );

