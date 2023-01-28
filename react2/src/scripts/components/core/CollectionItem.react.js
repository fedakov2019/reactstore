"use strict";

import React from "react";

import CollectionRemoveItemActionCreator from "../../actions/CollectionRemoveItemActionCreator.js";

class CollectionItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id={this.props.parent + "$" + this.props.id} style={{ margin: "10px" }}><span>{this.props.caption}</span><i className="material-icons left" onClick={
            () => { this.removeItem(this.props.parent, this.props.id); }}>remove_circle_outline</i></div>;
    }

    removeItem(id, data) {
        CollectionRemoveItemActionCreator.removeItem(id, data);
    }
}

export default CollectionItem;