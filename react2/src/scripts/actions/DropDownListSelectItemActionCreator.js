"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const selectItem = (ddlistId, key) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_DROPDOWNLIST_SELECT_ITEM,
        ddlistId: ddlistId,
        key: key
    });
};

export default {selectItem};