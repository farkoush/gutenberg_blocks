const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;
const { createHigherOrderComponent } = wp.compose;

import classnames from "classnames";
import ClassManager from '../components/ClassManager.js';
// import "./style.css";

addFilter(
  "blocks.registerBlockType",
  "jsforwpadvgb/add-code-attributes",
  addCodeAttributes
);

addFilter(
  "editor.BlockEdit",
  "jsforwpadvgb/add-code-inspector-controls",
  addCodeInspectorControls
);

addFilter(
  "blocks.getSaveElement",
  "jsforwpadvgb/modify-code-save-settings",
  modifyCodeSaveSettings
);

function addCodeAttributes(settings, name) {
  if ("core/code" !== name) return settings;

  settings.supports = lodash.merge({}, settings.supports, {
    align: ["full", "wide"]
  });
  settings.attributes.align = {
    type: "string",
    default: "full"
  };
  settings.attributes.highContrast = {
    type: "boolean",
    default: false
  };
  settings.attributes.classes = {
    type: "string",
    default: 'default'
  };
  return settings;
}

function addCodeInspectorControls(BlockEdit) {
  const withInspectorControls = createHigherOrderComponent(BlockEdit => {
    return props => {
      if ("core/code" !== props.name) return <BlockEdit {...props} />;

      return (
        <Fragment>
          <div
            // className={classnames({
            //   "high-contrast": props.attributes.highContrast
            // })}
            className = {props.attributes.classes}
          >
            <BlockEdit {...props} />
          </div>
          <InspectorControls>
            <PanelBody title={__("Custom Settings", "jsforwpadvblocks")}>
              <ToggleControl
                label={__("High Contrast", "jsforwpadvblocks")}
                checked={props.attributes.highContrast}
                onChange={highContrast => props.setAttributes({ highContrast })}
              />
            <ClassManager
                classes={props.attributes.classes}
                onChange={(val) => props.setAttributes({ classes: val })}
            />
            </PanelBody>
          </InspectorControls>
        </Fragment>
      );
    };
  });
  return withInspectorControls(BlockEdit);
}

function modifyCodeSaveSettings(el, block, attributes) {
//   if ("core/code" === block.name && attributes.highContrast & attributes.classes) {
    if ("core/code" === block.name && attributes.classes) {
    // el.props.className = classnames(el.props.className, {
    //   "high-contrast": attributes.highContrast
    // });
    el.props.className = attributes.classes
  }
  return el;
}
