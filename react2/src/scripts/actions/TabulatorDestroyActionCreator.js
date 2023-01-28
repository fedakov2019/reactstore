"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const destroy = (tabulatorId) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABULATOR_DESTROY,
        tabulatorId: tabulatorId
    });
};

export default {destroy};