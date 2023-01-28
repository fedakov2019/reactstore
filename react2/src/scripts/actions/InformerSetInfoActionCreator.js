"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const setInfo = (obj) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_INFORMER_SET,
        obj: obj
    });
};

export default {setInfo};