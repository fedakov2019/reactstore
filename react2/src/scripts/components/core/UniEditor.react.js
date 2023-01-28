"use strict";

import React from "react";

import UniEditorStore from "../../stores/UniEditorStore";

import UniEditorChangeActionCreator from "../../actions/UniEditorChangeActionCreator";

class UniEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.defaultValue
        };
        this._changeListener_ = this._changeListener.bind(this);
    }
    componentWillMount() {
        UniEditorStore.addChangeListener(this.props.id, this._changeListener_);
        UniEditorChangeActionCreator.change(this.props.id, this.props.defaultValue);
    }
    componentWillUnmount() {
        
        UniEditorStore.removeChangeListener(this.props.id, this._changeListener_);
    }
    render() {
        switch (this.props.type) {
            case "number":
            default :
                return <input type="text" 
                pattern="[0-9]{1,10}(\.[0-9]{1,2}){0,1}"
                defaultValue={this.props.defaultValue} 
                value={this.state.value} 
                onChange={(event) => {UniEditorChangeActionCreator.change(this.props.id, event.currentTarget.value);}}style={this.props.style}></input>;
        }
    }

    _changeListener() {
        this.setState({
            value: UniEditorStore.getValue(this.props.id)
        });
    }
}


export default UniEditor;