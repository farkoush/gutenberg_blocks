const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { createBlock } = wp.blocks;
const { registerBlockType } = wp.blocks;

import icons from "./icons";
// import "./plugin.scss";
import SwitcherControls from "./components/SwitcherControls";



export default registerBlockType( 'hoora/switcher', {
  title:'hoora switcher',
  icon: 'heart',
  category: 'formatting', // (common, formatting, layout, widgets, embed)
      // edit: Edit,
  edit : (props) => {
      const layouts = {
        default: [createBlock("core/paragraph", {})],
        hero: [
          createBlock("core/cover", { align: "full" }),
          createBlock("core/button", {
            text: __("Layout Switcher", "jsforwpadvblocks"),
            align: "center"
          }),
          createBlock("core/columns", { columns: 3 })
        ],
        featured: [
          createBlock("core/heading", {}),
          createBlock("core/spacer", { height: "10" }),
          createBlock("core/media-text", { align: "full" }),
          createBlock("core/spacer", { height: "40" }),
          createBlock("core/quote", {}),
          createBlock("core/spacer", { height: "20" }),
          createBlock("core/media-text", { mediaPosition: "right" }),
          createBlock("core/paragraph", {
            placeholder: "Outro Text"
          })
        ]
      };
    
      return (
        <Fragment>
            <SwitcherControls icons={icons} layouts={layouts} />
        </Fragment>
      );
  },
  save: ( props ) => {
    return(
      <div className="faq-container">
        save
      </div>
    )
  },
})
