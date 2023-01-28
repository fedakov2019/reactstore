"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const select = (tableId, id, value) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_SELECT_ROW,
        tableId: tableId,
        id: id,
        value: value
    });
};

export default {select};