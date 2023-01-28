"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const show = (recordId) => {
    Dispatcher.dispatch({
        type: ActionTypes.ERZ_ERZ_REPLIES_SHOW,
        recordId: recordId
    });
};

export default {show};