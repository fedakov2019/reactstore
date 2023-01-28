"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const tableColumnMove = (tableId, processedHeaderIndex, shift) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_COLUMN_MOVE,
        tableId: tableId,
        processedHeaderIndex: processedHeaderIndex,
        shift: shift
    });
};

export default {tableColumnMove};