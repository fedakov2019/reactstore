import "react";

import Table from "../core/Table.react";

const History = (props) => {
    return <div id={props.id} className="modal" style={props.style}>
        <div className="modal-content">
            <Table data-table-id="history"
                data-table-controller="history/History"
                itemsPerPage={20}
                canParallize={false}
                hidePaginatorIfSinglePage={true}
                conditionObj={props.params}
            ></Table>
        </div>
        <div className="modal-footer">
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">ОK</a>
        </div>
    </div >;
};

export default History;