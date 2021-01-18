const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;

import MetaBoxs from './metaBoxs.js';
import BlockList from "./components/BlockList";

registerPlugin( 'post-types-setting', {
    render: function() {
        return(
            <PluginSidebar name = 'post-types-setting' icon = 'screenoptions' title = 'PostTypes Setting'>
                <div className = 'plugin-sidebar-content'>
                    <MetaBoxs/>
                    {/* <BlockList /> */}
                </div>
            </PluginSidebar>
        )
    }
} );

// const PluginSidebarTest = () => (
//     <>
//     <PluginSidebar name="plugin-sidebar-test" title="My Plugin" icon='screenoptions'>
//         <p>Plugin Sidebar</p>
//     </PluginSidebar>
//     </>
// );
// registerPlugin( 'plugin-sidebar-test', { render: PluginSidebarTest } );
