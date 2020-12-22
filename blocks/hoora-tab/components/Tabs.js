const { createContext, useContext, useState } = wp.element;
const TabContext = createContext();
const Tabs = props => {
    const { children, defaultTab } = props;
    const [activeTab, setActiveTab] = useState(defaultTab);
    // const [count, setCount] = useState(0); EQUAL   
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       count: 0
    //     };
    //   }

    // {count} EQUAL {this.state.count}

    // <button onClick={() => setCount(count + 1)}> EQUAL 
    // <button onClick={() => this.setState({ count: this.state.count + 1 })}>


    // setAttributes({activeTab: defaultTab});

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
        {/* <TabContext.Provider value={activeTab}> */}
            {children}
        </TabContext.Provider>
    );
};
export default Tabs;