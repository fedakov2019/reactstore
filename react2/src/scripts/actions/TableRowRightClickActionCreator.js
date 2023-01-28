"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const rightClick = (tableId, id) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_RIGHT_CLICK_ROW,
        tableId: tableId,
        id: id
    });
};

export default {rightClick};