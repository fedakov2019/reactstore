"use strict";

import React from "react";

class DText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:props.defaultValue
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.defaultValue });
    }

    componentDidUpdate() {
        this.props.onEdit(this.props, this.state);
    }

    render() {
        return <div className="input-field col s11">
            <input type="text" id={"txtEdtr"} value={this.state.value}
                onChange={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({ value: event.currentTarget.value });
                    }}></input>
               </div>;
    }
}

export default DText;