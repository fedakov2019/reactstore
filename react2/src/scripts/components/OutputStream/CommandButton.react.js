"use strict";

import React from "react";

class CommandButton extends React.Component {
    render() {
        return <div onClick={this.props.onClick} className="col s6 m2"><p className="z-depth-2 waves-effect waves-light btn" style={{height:"100%"}}>{this.props.children}</p></div>;
    }
}

export default CommandButton;