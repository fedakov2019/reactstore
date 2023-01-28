"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const setVisibility = (tableId, fieldName, isVisible) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_COLUMN_VISIBLE,
        tableId: tableId,
        fieldName: fieldName,
        isVisible: isVisible
    });
};

export default {setVisibility};