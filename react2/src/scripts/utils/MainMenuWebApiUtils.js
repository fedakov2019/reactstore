"use strict";

import $ from "jquery";

import  Globals from "../Globals";
let ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../common/LogLevel";
import Logger from "../common/Logger";

import  MainMenuInfoRecievedActionCreator from "../actions/MainMenuInfoRecievedActionCreator";

import StatusBarIncrLongrunner from "../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../actions/StatusBarDecrLongrunner";

export default {
	sendRequest:function()
	{
		$.ajax({
			url:ServerPath+"Interior/GetMainMenuItems",
			type:"GET",
			xhrFields:{
				withCredentials:true
			},
			success:function(data)
			{
				MainMenuInfoRecievedActionCreator.mainMenuInfoRecieved(data);
			},
			error:function(xhr, text, err)
			{
				MainMenuInfoRecievedActionCreator.mainMenuInfoRecieved([]);
				Logger.log("MainMenuWebApiUtils sendRequest", LogLevel.Error, {xhr:xhr, text:text, err:err});
			},
			beforeSend:function()
			{
				StatusBarIncrLongrunner.incrLongrunner();
			},
			complete:function()
			{
				StatusBarDecrLongrunner.decrLongrunner();
			}
		});
	}
};