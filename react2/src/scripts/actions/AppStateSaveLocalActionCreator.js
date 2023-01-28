"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";
import AppStateUtils from "../utils/AppStateUtils";

const saveLocal=(data, activeIndex)=>
{
    Dispatcher.dispatch({
        type:ActionTypes.I_APPSTATE_SAVE_LOCAL
    });
    AppStateUtils.saveLocal(data, activeIndex);
}

export default {saveLocal};