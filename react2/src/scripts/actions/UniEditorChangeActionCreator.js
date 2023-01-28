"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const change= function(edtrId, value) {
    Dispatcher.dispatch({
        type:ActionTypes.C_UNI_EDITOR_CHANGE,
        edtrId:edtrId,
        value:value
    });
}

export default {change};