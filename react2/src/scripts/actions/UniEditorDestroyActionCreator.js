"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const destroy= function(edtrId) {
    Dispatcher.dispatch({
        type:ActionTypes.C_UNI_EDITOR_DESTROY,
        edtrId:edtrId
    });
}

export default {destroy};