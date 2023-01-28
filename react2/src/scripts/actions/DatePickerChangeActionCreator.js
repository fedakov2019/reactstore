"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const change = (itemId, value) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_DATE_PICKER_CHANGE,
        itemId: itemId,
        value: value
    });
};

export default {change};