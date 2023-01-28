"use strict";

import React from "react";

import StatusBarStore from "../stores/StatusBarStore";

let StatusBar=React.createClass({
	getInitialState:function()
	{
		return {awaits:false};
	},
	componentDidMount:function()
	{
		StatusBarStore.addLongrunnerChange(this._longrunnerChanged);
		this._longrunnerChanged();
	},
	componentWillUnmount:function()
	{
		StatusBarStore.removeLongrunnerChange(this._longrunnerChanged);
	},
	render:function()
	{
		let awaitSign=this.state.awaits?<div className="progress"><div className="indeterminate"></div></div>:"";
		return <div id="statusBar">{awaitSign}</div>;
	},
	_longrunnerChanged:function()
	{
		this.setState({
			awaits:StatusBarStore.hasLongRunners()
		})
	}
});

export default StatusBar;