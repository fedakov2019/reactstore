"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const destroy = (ddlistId) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_DROPDOWNLIST_DESTROY,
        ddlistId: ddlistId
    });
};

export default {destroy};