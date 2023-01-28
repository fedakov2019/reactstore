"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const destroy = (itemId) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_DATE_PICKER_DESTROY,
        itemId: itemId
    });
};

export default {destroy};