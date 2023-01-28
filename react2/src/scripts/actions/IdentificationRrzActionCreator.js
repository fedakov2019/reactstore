"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const setParams = (params) => {
    Dispatcher.dispatch({
        type: ActionTypes.RRZ_SET_SEARCH_PARAMS,
        params: params
    });
};

export default {setParams};