"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const tableColumnResize = (tableId, fieldName, newWidth) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_COLUMN_RESIZE,
        tableId: tableId,
        fieldName: fieldName,
        newWidth: newWidth
    });
};

export default {tableColumnResize};