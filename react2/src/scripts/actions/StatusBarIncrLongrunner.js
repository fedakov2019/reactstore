"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const incrLongrunner = () => {
    setTimeout(function() {
            Dispatcher.dispatch({
                type: ActionTypes.I_STATUSBAR_INCR_LONGRUNNER
            });
        }, 1000
    );
};

export default {incrLongrunner};