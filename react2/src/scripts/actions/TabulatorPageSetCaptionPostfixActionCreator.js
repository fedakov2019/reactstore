"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const setCaptionPostfix = (tabulatorId, tabId, postfix) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABULATOR_PAGE_SET_CAPTION_POSTFIX,
        tabulatorId: tabulatorId,
        tabId: tabId,
        postfix: postfix
    });
};

export default {setCaptionPostfix};