"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const edit = (tableId, id, value) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_EDIT_ROW_INLINE,
        tableId: tableId,
        id: id,
        value: value
    });
};

export default {edit};