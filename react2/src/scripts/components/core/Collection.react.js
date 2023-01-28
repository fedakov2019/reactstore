"use strict";

import React from "react";

import CollectionStore from "../../stores/CollectionStore.js"

import CollectionItem from "./CollectionItem.react";

class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {

        CollectionStore.addChangeListener(this.props.id, this._onChange);
    }

    componentDidUpdate() {
        let data = CollectionStore.getData(this.props.id);
        if (this.props.onChange != null&&data!=null) {
            this.props.onChange(this.props, this.state, data);
        }
    }

    componentWillUnmount() {
        CollectionStore.removeChangeListener(this.props.id, this._onChange);
    }

    _onChange() {
        let data = CollectionStore.getData(this.props.id);
        this.setState({ data: data });
    }

    render() {
        let elems = [];
        let data = this.state.data;
        if (this.state.data == null) {
        } else {
            Object.keys(this.state.data).forEach((v) => {
                elems.push(<CollectionItem parent={this.props.id} id={v} caption={data[v]} key={this.props.id + "$" + v}></CollectionItem>);
            });
        }
        return <div style={this.props.style}>{elems}</div>;
    }

}

export default Collection;