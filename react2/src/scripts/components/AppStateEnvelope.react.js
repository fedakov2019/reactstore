"use strict";

import React from "react";

import AppStateStore from "../stores/AppStateStore";

import AdminBoard from "./admin/AdminBoard.react";

import UserSettingsEditor from "./UserSettingsEditor.react";

import DictViewer from "./dict/DictViewer.react";
 
import InputStream from "./InputStream/InputStream.react";
import InputRegistryView from "./InputStream/InputRegistryView.react";
 
import Reporting from "./Reporting.react";

import Erz from "./erz/Erz.react";

import MoStream from "./Mo/MoStream.react";
import MoRegistryView from "./Mo/MoRegistryView.react";

import OutputStream from "./OutputStream/OutputStream.react";
import OutputRegistryView from "./OutputStream/OutputRegistryView.react";

import PersonHistoryView from "./history/PersonHistoryView.react";


let AppStateEnvelope=React.createClass({
    getInitialState:function() {
        return { command: null };
    },
    componentWillMount:function() {
        this.setState({ command: this.props.command });
        AppStateStore.addChangeListener(this._onChange);
    },
    componentWillUnmount:function() {
        AppStateStore.removeChangeListener(this._onChange);
    },
    render:function()
	{
        switch (this.state.command) {
            case "AdminBoard":
                return <AdminBoard></AdminBoard>;
                break;
            case "UserInfo":
                return <UserSettingsEditor></UserSettingsEditor>;
                break;
            case "DictViewer":
                return <DictViewer></DictViewer>;
                break;
            case "InputStream":
                return <InputStream initials={this.state.initials}></InputStream>;
                break;
            case "InputRegistryView":
                return <InputRegistryView id={(this.state != null && this.state.initials != null && this.state.initials.id != null) ? this.state.initials.id : this.state.id}>
                </InputRegistryView>;
                break;
            case "Reporting":
                return <Reporting></Reporting>;
                break;
            case "MedOrgStream":
                return <MoStream initials={this.state.initials}></MoStream>;
                break;
            case "MoRegistryView":
                return <MoRegistryView initials={this.state.initials}></MoRegistryView>;
                break;
            case "OutputStream":
                return <OutputStream initials={this.state.initials}></OutputStream>;
                break;
            case "Erz":
                return <Erz></Erz>;
                break;
            case "OutputRegistryView":
                return <OutputRegistryView id={(this.state != null && this.state.initials != null && this.state.initials.id != null) ? this.state.initials.id : this.state.id} isD={this.state.initials.isD}>
                </OutputRegistryView>;
                break;
            case "PersonHistory":
                return <PersonHistoryView />;
                break;
			default:
				let Elem=<div>[not implemented]</div>;
				return Elem;
				break;
		}
	},
    _onChange:function() {
        this.setState(AppStateStore.getCurrent());
    }
});

export default AppStateEnvelope;