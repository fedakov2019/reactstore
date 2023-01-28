"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const unselectAll = (tableId) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_UNSELECT_ALL,
        tableId: tableId
    });
};

export default {unselectAll};