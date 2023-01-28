"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const decrLongrunner = () => {
    Dispatcher.dispatch({
        type: ActionTypes.I_STATUSBAR_DECR_LONGRUNNER
    });
};

export default {decrLongrunner};