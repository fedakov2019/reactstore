"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const setState = (state) => {
    Dispatcher.dispatch({
        type: ActionTypes.I_APPSTATE_SET_STATE,
        state: state
    });
};

export default {setState};