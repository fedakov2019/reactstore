"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const destroy = (tableId) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_DESTROY,
        tableId: tableId
    });
};

export default {destroy};