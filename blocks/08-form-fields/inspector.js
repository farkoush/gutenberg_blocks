/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const {
  PanelBody,
  SelectControl
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        selectControl
      },
      setAttributes
    } = this.props;

    return (
      <InspectorControls>
        <PanelBody>
          <SelectControl
            label={__("Select Control", "jsforwpblocks")}
            value={selectControl}
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" }
            ]}
            onChange={selectControl => setAttributes({ selectControl })}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
