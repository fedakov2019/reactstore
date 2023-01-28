"use strict";

//import 'babel/register';

import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

window.React = React;

import AppStateStore from "./scripts/stores/AppStateStore";
import AppStateSaveLocalActionCreator from "./scripts/actions/AppStateSaveLocalActionCreator";

import UserSettingsGetActionCreator from "./scripts/actions/UserSettingsGetActionCreator";

import {ContentMountPoint} from "./scripts/constants/Constants";

window.onbeforeunload=function()
{
    let elem=document.getElementById("body");
	ReactDOM.unmountComponentAtNode(elem);
	AppStateSaveLocalActionCreator.saveLocal(AppStateStore.getAllData(), AppStateStore.getActiveIndex());
}

UserSettingsGetActionCreator.userSettingsColorGet();

import Manager from "./scripts/components/Manager.react";

let elem=document.getElementById("body");

ReactDOM.render(<Manager></Manager>, elem);