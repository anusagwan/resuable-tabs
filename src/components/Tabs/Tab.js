import React, { Component } from 'react'

class Tab extends Component {
    render() {
        //tab content
        if (this.props.isSelectedTab) {
            return (
             <div className="tab-content">
                {this.props.children}
            </div>
            )
        }
        return null;
    }
}

export default Tab