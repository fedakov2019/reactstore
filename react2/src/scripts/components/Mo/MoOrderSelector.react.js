"use strict";

import React from "react";

import Table from "../core/Table.react";

import MoOrderAddPanel from "./MoOrderAddPanel.react";

class MoOrderSelector extends React.Component {
    render() {
        return <div id={this.props.id} className="modal" style={this.props.style}>
				    <div className="modal-content" style={{ width: "100%", height: "90%" }}>
                        <MoOrderAddPanel id="moOrderAppPanel" sumMo={this.props.sumMo} onOkClick={(number, date, sumMo) => { this.props.onAddOrder(this.props.medOrg, number, date, sumMo, this.props.idsRegistry, this.props.onRowDoubleClick) }}></MoOrderAddPanel>
                        <hr/>
                        <Table data-table-id="moOrderList" 
                            data-table-controller="moStream/MoOrderListView" 
                            conditionObj={this.props.medOrg} 
                            canParallize={true} 
                            itemsPerPage="20" 
                            onRowDoubleClick={(keyFieldValue, tableId) => { this.props.onRowDoubleClick(keyFieldValue, this.props.idsRegistry); }}>
                        </Table>
                    </div>
                </div>;
    }
}

export default MoOrderSelector;