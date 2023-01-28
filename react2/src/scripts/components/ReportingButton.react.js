"use strict";

import React from "react";
import ReactDOM from "react-dom";

import DocumentViewer from "./DocumentViewer.react";

import ReportingClickableItem from "./ReportingClickableItem.react";

class ReportingButton extends React.Component{
    render() {
        return <ReportingClickableItem {...this.props} onClick={this._onClick.bind(this)}></ReportingClickableItem>;
    }
    _onClick(event) {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.props.reportMountPoint));
        ReactDOM.render(<DocumentViewer
        id="documentMounted" 
		style={{width:"75vw", maxHeight:"96vh", height:"96vh", top:"2vh"}} 
    reportPath={`%2f${this.props.reportPath}&rs:Command=Render`}
		params={this.props.params} 
		mountPoint={this.props.reportMountPoint}></DocumentViewer>, 
		document.getElementById(this.props.reportMountPoint));
		$("#documentMounted").openModal();
    }
}

export default ReportingButton;