const { createContext, useContext, useState } = wp.element;
const Tab = props => {
    const { activeTab, setActiveTab } = useContext(TabContext);
    // const { label, tabIndex } = props;
    // const { children, tabIndex } = props;
    const active = activeTab === props.tabIndex;

    return (
        <li
            onClick={() => {setActiveTab(props.tabIndex); }} //setAttributes actoiveTab : tabIndex 
            //onClick={(index) => setActiveTab(index)} //setAttributes actoiveTab : tabIndex 

            className={`tabs-tab ${active ? "active" : ""}`}
        >
            {" "}
            {props.children}{" "}
        </li>
    );
};
export default Tab;