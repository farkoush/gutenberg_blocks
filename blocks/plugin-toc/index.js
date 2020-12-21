/**
 * Get dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
// const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { PanelBody, PanelRow } = wp.components;

import classnames from "classnames";
import icon from "./icon";
// import "./plugin.scss";
import BlockList from "./components/BlockList";

const TableOfContents = props => {
  return (
    <Fragment>
      <PluginSidebarMoreMenuItem target="hoora-toc">
        {"Table of Contents"}
      </PluginSidebarMoreMenuItem>
      <PluginSidebar
        name="hoora-toc"
        title="Table of Contents"
      >
        <PanelBody>
          <PanelRow>
            <BlockList />
          </PanelRow>
        </PanelBody>
      </PluginSidebar>
    </Fragment>
  );
};

// registerPlugin("hoora-toc", {
//   icon,
//   render: TableOfContents
// });

