import React, { Component } from 'react'
import './App.css';
import Tab from './components/Tabs/Tab';
import TabNav from './components/Tabs/TabNav';
import AlertDialog from './components/AlertDialog/AlertDialog'

class App extends Component {
  constructor(props) {
    super(props);
    this.tabRef = React.createRef()
    this.state = {
      isTabCount: false,
            isAccept: false,
      selected: { id: 1, name: "Tab 1", content: "This is Tab 1" },
      tabs: [
         { id: 1, name: "Tab 1", content: "This is Tab 1" },
         { id: 2, name: "Tab 2", content: "This is Tab 2" },
         { id: 3, name: "Tab 3", content: "This is Tab 3" }]
      }
  }
  handleNav = (direction) => {
    console.log(direction,"handleNav")
    if (direction === 'left') {
      return this.tabRef ? (this.tabRef.current.scrollLeft -= 200) : null
    } else {
     return this.tabRef ? (this.tabRef.current.scrollLeft += 200) : null
    }
  }

  setSelected = (tab) => {
    this.setState({
      selected: tab
    })
  }
   handleAccept = () => {
       this.setState({
       isAccept: true
    })
  }
  addTab = () => {
    if (this.state.tabs.length > 9) {
      this.setState({
        isTabCount: true
      })
    } else {
    const { tabs } = this.state;
    let tabLenUni = tabs[tabs.length - 1].id + 1 
    console.log(tabLenUni,"tabLenUni")
    const newItemObj = {
      id: tabLenUni,
      name: `Tab ${tabLenUni}`,
      content: `This is Tab ${tabLenUni}`
    };

    this.setState({
      tabs: [...tabs, newItemObj],
      selected: newItemObj,
      
      });
    }
  };
  deleteTab = deleteTab => {
    
    const { tabs } = this.state;
    const tabToDeleteIndex = tabs.findIndex(tab => tab.id === deleteTab.id);

    const updatedTabs = tabs.filter((tab, index) => {
      return index !== tabToDeleteIndex;
    });

    const previousTab =
      tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};

    this.setState({
      tabs: updatedTabs,
      selected: previousTab,
      isAccept: false
    });
    
  };
  render() {
    return (
      <div>
      <div className={this.state.isAccept ||this.state.isTabCount ? 'conatiner-opac' : 'container'}>
        <TabNav
          addTab={this.addTab}
          tabRef={this.tabRef}
          handleNav={(direction) => this.handleNav(direction)}
          tabs={this.state.tabs}
          selected={this.state.selected}
          setSelected={this.setSelected}
          deleteTab={this.handleAccept}>
            <Tab isSelectedTab={this.state.selected && this.state.selected.content }>
               {this.state.selected.content}
            </Tab>
        </TabNav>
      </div>
      <div className="alertDiv">
      {this.state.isAccept? <AlertDialog
        open={this.state.isAccept}
        isRejectRequired={true}
        cancelButtonText="NO"
        actionButtonText="YES"
        content="Are you sure you want to delete this tabs ? "
        handleAccept={() => this.deleteTab(this.state.selected)}
        handleReject={() => {
          this.setState({
            isAccept: false
          })
        }}
      /> : null}
      {this.state.isTabCount ? <AlertDialog
        open={this.state.isTabCount}
        isRejectRequired={true}
        cancelButtonText="OK"
        content="You cannot create more than 10 Tabs"
        handleReject={() => {
          this.setState({
            isTabCount: false
          })
        }}
       /> : null}
      </div>   
      </div>
    )
  }
}

export default App;
