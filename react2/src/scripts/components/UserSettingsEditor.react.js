"use strict"

import React from "react";

import ColorPicker from "./core/ColorPicker.react";

import ButtonOk from "./simple/ButtonOk.react";
import ButtonCancel from "./simple/ButtonCancel.react";

import UserSettingsStore from "../stores/UserSettingsStore";
import UserSettingsGetActionCreator from "../actions/UserSettingsGetActionCreator";
import UserSettingsSetActionCreator from "../actions/UserSettingsSetActionCreator";

let UserSettingsEditor=React.createClass({
	getInitialState:function()
	{
		return getStateFromStores();
	},
	componentDidMount:function()
	{
		UserSettingsStore.addChangeColorListener(this._onStoreChange);
		UserSettingsGetActionCreator.userSettingsColorGet();
	},
	componentWillUnmount:function()
	{
		UserSettingsStore.removeChangeColorListener(this._onStoreChange);
	},
	render:function(){
		return 	<div className="row">
					<div className="col s12 m12 l4">
						<div className="card">
							<div className="card-content">
							{
								this.state.colorSettings.map(function(item){
									return <div key={item.id}><ColorPicker data={item} onChange={setTmpValue}></ColorPicker></div>;
								})
							}
							</div>
							<div className="card-action">
										<ButtonOk onClick={save}></ButtonOk>
										<ButtonCancel onClick={this._onStoreChange}></ButtonCancel>
							</div>
						</div>
					</div>
				</div>;
	},
	_onStoreChange:function()
	{
		this.setState(getStateFromStores());
	}
});

function getStateFromStores()
{
	return {
		colorSettings:UserSettingsStore.getColorSettings()
	};
}

function save()
{
	UserSettingsSetActionCreator.userSettingsColorSet();
}

function setTmpValue(event)
{
	UserSettingsStore.setNewColorSettings(event.target.attributes["data-id"].value, event.target.value);
}

export default UserSettingsEditor;