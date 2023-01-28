"use strict";

import React from "react";

import Table from "../core/Table.react";

import InOrderAddPanel from "./InOrderAddPanel.react";

class InOrderSelector extends React.Component {
    render() {
        return <div id={this.props.id} className="modal" style={this.props.style}>
            <div className="modal-content" style={{ width: "100%", height: "90%" }}>
                <InOrderAddPanel id="inOrderAppPanel" onOkClick={(number, date, sum) => { this.props.onAddOrder(this.props.tfCode, number, date, sum) }}></InOrderAddPanel>
                <hr />
                <Table data-table-id="inOrderList"
                    data-table-controller="InputStream/InOrderListView"
                    conditionObj={this.props.tfCode}
                    canParallize={true}
                    itemsPerPage="20"
                    onRowDoubleClick={(keyFieldValue, tableId) => { console.log("-",this.props); this.props.onRowDoubleClick(keyFieldValue, this.props.idsRegistry, this.props.tableId, this.props.tableControllerName); }}>
                </Table>
            </div>
        </div>;
    }
}

export default InOrderSelector;