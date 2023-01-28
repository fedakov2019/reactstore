"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const pageResize = (tableId, itemsPerPage) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_PAGE_RESIZE,
        tableId: tableId,
        itemsPerPage: itemsPerPage
    });
};

export default {pageResize};