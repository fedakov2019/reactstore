"use strict";

import {ActionTypes} from "../constants/Constants";
import Dispatcher from "../dispatcher/Dispatcher";
import AppStateUtils from "../utils/AppStateUtils";

const setup=()=>
	{
		let context=AppStateUtils.setup();
		Dispatcher.dispatch({
			type:ActionTypes.I_APPSTATE_SETUP,
			data:context.Data,
			activeIndex:context.ActiveIndex
		});
	}

export default {setup};