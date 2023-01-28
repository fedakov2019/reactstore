"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const pageSwitch = (tabulatorId, tabId) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABULATOR_PAGE_SWITCH,
        tabulatorId: tabulatorId,
        tabId: tabId
    });
};

export default {pageSwitch};