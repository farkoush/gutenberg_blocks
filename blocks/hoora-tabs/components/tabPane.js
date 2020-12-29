const TabPane = props => {
    const { children, tabIndex } = props;

    if (attributes.activeTab === tabIndex) {
        // return <div className="tabs-tab-pane">{children}</div>;
        return <div className={`tabs-tab-pane ${tabIndex}`}>{children}</div>;
    } else {
        return null;
    }
};
export default TabPane;