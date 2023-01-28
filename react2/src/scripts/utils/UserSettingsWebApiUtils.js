"use strict";

import $ from "jquery";

import Globals from "../Globals";
let ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../common/LogLevel";
import Logger from "../common/Logger";

import UserSettingsInfoRecievedActionCreator from "../actions/UserSettingsInfoRecievedActionCreator";
import UserSettingsInfoSendedActionCreator from "../actions/UserSettingsInfoSendedActionCreator";

import StatusBarIncrLongrunner from "../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../actions/StatusBarDecrLongrunner";

export default {
	getColorFromServer:function()
	{
		$.ajax({
			url:ServerPath+"Interior/GetUserColorSettings",
			type:"GET",
			xhrFields:{
				withCredentials:true
			},
			success:function(data)
			{
				UserSettingsInfoRecievedActionCreator.userSettingsColorRecieved(data);
			},
			error:function(xhr, text, err)
			{
				UserSettingsInfoRecievedActionCreator.userSettingsColorRecieved([]);
				Logger.log("UserSettingsStore GetColorFromServer", LogLevel.Error, {xhr:xhr, text:text, err:err});
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
	},
	getTableFromServer:function()
	{
		$.ajax({
			url:ServerPath+"Interior/GetUserTableSettings",
			type:"GET",
			xhrFields:{
				withCredentials:true
			},
			success:function(data)
			{
				UserSettingsInfoRecievedActionCreator.userSettingsTableReceived(data);
			},
			error:function(xhr, text, err)
			{
				UserSettingsInfoRecievedActionCreator.userSettingsTableReceived([]);
				Logger.log("UserSettingsStore GetTableFromServer", LogLevel.Error, {xhr:xhr, text:text, err:err});
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
	},
	sendColorToServer:function(newValue)
	{
		$.ajax({
			url:ServerPath+"Interior/PostUserColorSettings",
			type:"POST",
			xhrFields:{
				withCredentials:true
			},
			data:JSON.stringify(newValue),
			contentType: "application/json;charset=utf-8",
			success:function()
			{
				UserSettingsInfoSendedActionCreator.userSettingsColorSended();
			},
			error:function(xhr, text, err)
			{
				Logger.log("UserSettingsStore SendColorToServer", LogLevel.Error, {xhr:xhr, text:text, err:err});
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
	},
	sendTableToServer:function(newValue)
	{
		$.ajax({
			url:ServerPath+"Interior/PostUserTableSettings",
			type:"POST",
			xhrFields:{
				withCredentials:true
			},
			data:JSON.stringify(newValue),
			contentType: "application/json;charset=utf-8",
			success:function(data)
			{
				UserSettingsInfoSendedActionCreator.userSettingsTableSended();
			},
			error:function(xhr, text, err)
			{
				Logger.log("UserSettingsStore SendTableToServer", LogLevel.Error, {xhr:xhr, text:text, err:err});
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