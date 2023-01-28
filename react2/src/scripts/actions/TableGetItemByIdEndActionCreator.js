"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const getItemByIdEnd = (tableId, itemId, data) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_GET_ITEM_BY_ID,
        data: data,
        itemId: itemId,
        tableId: tableId
    });
};

export default {getItemByIdEnd};