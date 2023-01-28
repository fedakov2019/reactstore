"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const filter = (tableId, fieldName, filter) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_FILTER,
        tableId: tableId,
        fieldName: fieldName,
        filter: filter
    });
};
const removeAllFilters = (tableId) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_FILTER,
        tableId: tableId,
        removeAll: true
    });
};

export default {filter, removeAllFilters};