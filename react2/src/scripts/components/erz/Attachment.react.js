"use strict";

import React from "react";

import Table from "../core/Table.react";

class Attachment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id={this.props.id} className="modal" style={this.props.style}>
            <div className="modal-content">
                <div className="row">История прикрепления</div>
                <div className="row">{this.props.header}</div>
                <hr/>
                <Table data-table-id="attachmentErz"
                    data-table-controller="erz/Attachment"
                    itemsPerPage="20"
                    canParallize={false}
                    conditionObj={this.props.enp}>
                </Table>
            </div>
            <div className="modal-footer">
                <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">ОK</a>
            </div>
        </div>;
    }
}

export default Attachment;