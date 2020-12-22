const { createContext, useContext, useState } = wp.element;
const TabPane = props => {
    const { activeTab } = useContext(TabContext);
    const { children, tabIndex } = props;

    if (activeTab === tabIndex) {
        return <div className="tabs-tab-pane">{children}</div>;
    } else {
        return null;
    }
};
export default TabPane;