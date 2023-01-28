"use strict";

import React from "react";

import Table from "../core/Table.react";

class OnkoStruct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let conf = this.props.config;
        return <div>
            <div>Сведения о случаях лечения онк. заболеваний</div>
            <Table data-table-id={conf.onk["data-table-id"] + "$" + this.props.config.conditionObj.id + "_viewport"}
                data-table-controller={conf.onk["data-table-controller"]}
                itemsPerPage={conf.onk.itemsPerPage}
                conditionObj={this.props.config.conditionObj}
                canParallize={conf.onk.canParallize}>
            </Table>
            <br />
            <br />
            <div>Консилиумы</div>
            <hr />
            <Table data-table-id={conf.cons["data-table-id"] + "$" + this.props.config.conditionObj.id + "_viewport"}
                data-table-controller={conf.cons["data-table-controller"]}
                itemsPerPage={conf.cons.itemsPerPage}
                conditionObj={this.props.config.conditionObj}
                canParallize={conf.cons.canParallize}>
            </Table>
            <br />
            <br />
            <div>Направления</div>
            <hr />
            <Table data-table-id={conf.napr["data-table-id"] + "$" + this.props.config.conditionObj.id + "_viewport"}
                data-table-controller={conf.napr["data-table-controller"]}
                itemsPerPage={conf.napr.itemsPerPage}
                conditionObj={this.props.config.conditionObj}
                canParallize={conf.napr.canParallize}>
            </Table>
        </div>;
    }
}

export default OnkoStruct;