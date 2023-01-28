"use strict";

import  $ from "jquery";

import Globals from "../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../common/LogLevel";
import Logger from "../common/Logger";

import UserInfoRecievedActionCreator from "../actions/UserInfoRecievedActionCreator";

import StatusBarIncrLongrunner from "../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../actions/StatusBarDecrLongrunner";

export default {
	sendRequest:function()
	{
		$.ajax({
		url:ServerPath+"Interior/GetUserInfo",
		type:"GET",
		xhrFields:{
			withCredentials:true
		},
		success:function(data)
		{
			UserInfoRecievedActionCreator.userInfoRecieved(data);
		},
		error:function(xhr, text, err)
		{
			UserInfoRecievedActionCreator.userInfoRecieved({});
			Logger.log("UserInfoStore GetFromServer", LogLevel.Error, {xhr:xhr, text:text, err:err});
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