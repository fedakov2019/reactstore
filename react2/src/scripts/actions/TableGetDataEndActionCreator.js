"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const getDataEnd = (tableId, data) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_GET_DATA,
        data: data,
        tableId: tableId
    });
};

export default {getDataEnd};