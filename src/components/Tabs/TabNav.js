import React, { Component } from "react";
import "./Tabs.css";

class TabNav extends Component {
    constructor(props) {
    super(props);
    this.draggingItem = React.createRef()
    this.dragOverItem = React.createRef()
        this.state = {
        tabList: {...this.props}
        }
    }
     handleDragStart = (e, position) => {
        this.draggingItem.current = position;
     };
    handleDragEnter = (e, position) => {
      this.dragOverItem.current = position;
      const tabListCopy = this.props.tabs
      const draggingItemContent = tabListCopy[this.draggingItem.current];
      tabListCopy.splice(this.draggingItem.current, 1);
      tabListCopy.splice(this.dragOverItem.current, 0, draggingItemContent);
      this.draggingItem.current = this.dragOverItem.current;
       this.dragOverItem.current = null;
       this.setState({
           tabList: tabListCopy
       })
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", background: "#f2f3f4" }}>
          <i
            className={
              this.props.tabs.length > 3 ? "fa fa-angle-left arrow" : null
            }
            aria-hidden="true"
            onClick={() => this.props.handleNav("left")}
          ></i>
          <ul className="nav nav-tabs" ref={this.props.tabRef}>
            {this.props.tabs.map((tab, index) => {
              return (
                  <li className="li-items" key={index}
                    onDragStart={(e) => this.handleDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => this.handleDragEnter(e, index)}
                    draggable
                  >
                  <button
                    className={
                      this.props.selected.id === tab.id ? "active" : ""
                    }
                    onClick={() => this.props.setSelected(tab)}
                  >
                    {tab.name}
                  </button>
                  <i
                     className="fa fa-close"
                    style={{ cursor: "pointer" }}
                    onClick={this.props.deleteTab}
                  ></i>
                </li>
              );
            })}
          </ul>
          <i
            className={
              this.props.tabs.length > 3 ? "fa fa-angle-right arrow" : null
            }
            aria-hidden="true"
            onClick={() => this.props.handleNav("right")}
          ></i>
          <i
            style={{
              fontSize: "23px",
              paddingTop: "22px",
              marginRight: "17px",
              cursor: "pointer",
              color: "lightslategray",
            }}
            className="fa fa-plus addIcon"
            aria-hidden="true"
            onClick={this.props.addTab}
          ></i>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default TabNav;
