"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const getDataEnd = (ddlistId, data) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_DROPDOWNLIST_GET_DATA,
        data: data,
        ddlistId: ddlistId
    });
};

export default {getDataEnd};