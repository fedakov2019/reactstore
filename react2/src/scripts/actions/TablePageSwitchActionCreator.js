"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const pageSwitch = (tableId, pageNumber) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_PAGE_SWITCH,
        tableId: tableId,
        pageNumber: pageNumber
    });
};

export default {pageSwitch};