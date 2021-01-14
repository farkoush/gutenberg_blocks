const { withSelect, select, withDispatch } = wp.data;
const { compose } = wp.compose;
const { createBlock } = wp.blocks;
const { __ } = wp.i18n;
const { Fragment } = wp.element;

// import SourceMetaField from './sourceMetaField.js';
import icons from "./icons";
// import SwitcherControls from "./components/SwitcherControls";
import SwitcherButton from "./components/SwitcherButton";


const metaBoxs = ({typesList, currentPostType, blocks}) => {
    function* values(postTypesObj) {
        for (let prop of Object.keys(postTypesObj))
            yield postTypesObj[prop];
    }
    console.log(typesList)
    const blockIds = blocks.map(block => block.clientId);
        const layouts = {
          default: [createBlock("core/paragraph", {})],
          source: [
            createBlock("hoora/source"),
          ],
          gallery: [
            createBlock("hoora/gallery"),
          ],
          attachment:[
            createBlock("hoora/gallery"),
          ]
        };
    return ( 
        (typesList !== undefined) &&
        <div>
            { Array.from(values(typesList)).map((item, i) => [
                    item.supports.source && item.slug == currentPostType &&
                    <div key={i} className="source-meta-field">
                        {/* {item.slug} */}
                        <SwitcherButton
                            label="Source"
                            icon={icons.hero}
                            blockIds={blockIds}
                            layout={layouts.source}
                        />
                    </div>
                    // item.supports.gallery && item.slug == currentPostType &&
                    // <div key={i} className="gallery-meta-field">
                    //     {/* {item.slug} */}
                    //     <SwitcherButton
                    //         label="Gallery"
                    //         icon={icons.featured}
                    //         blockIds={blockIds}
                    //         layout={layouts.gallery}
                    //     />
                    // </div>,
                    // item.supports.attachment && item.slug == currentPostType &&
                    // <div key={i} className="attachment-meta-field">
                    //     {/* {item.slug} */}
                    //     <SwitcherButton
                    //         label="attachment"
                    //         icon={icons.featured}
                    //         blockIds={blockIds}
                    //         layout={layouts.attachment}
                    //     />
                    // </div>,
                ]
            )}
        </div>
    );
  };
  export default withSelect(select => {
    // const {getPostType} = select('core');
    return {
        typesList: select('core').getPostType(),
        currentPostType : select('core/editor').getCurrentPostType(),
        blocks: select("core/editor").getBlocks()
    };
  })(metaBoxs);
  