"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const setCaseIds = (caseIds) => {
    Dispatcher.dispatch({
        type: ActionTypes.IN_REJECT_SELECTOR_SET_IDS,
        caseIds: caseIds
    });
};

export default {setCaseIds};