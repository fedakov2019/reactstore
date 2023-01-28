"use strict";

import React from "react";

class DMultiLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:props.defaultValue
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.defaultValue == null ? "" : nextProps.defaultValue });
    }

    componentDidUpdate() {
        this.props.onEdit(this.props, this.state);
    }

    render() {
        return <div className="input-field col s11">
            <textarea type="text" id={"txtEdtr"} value={this.state.value} defaultValue={this.state.value}
                onChange={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({ value: event.currentTarget.value });
                    }}></textarea>
               </div>;
    }
}

export default DMultiLine;