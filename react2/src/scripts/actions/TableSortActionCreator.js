"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const sort = (tableId, fieldName, sortOrder) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_SORT,
        tableId: tableId,
        fieldName: fieldName,
        sortOrder: sortOrder
    });
};

export default {sort};