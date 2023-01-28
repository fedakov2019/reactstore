"use strict";

import React from "react";

import InformerStore from "../stores/InformerStore";

let Informer=React.createClass({
	getInitialState:function()
	{
		return {
			text:InformerStore.getText()
		};
	},
	componentWillMount:function()
	{
		InformerStore.addInformerChangeListener(this._storeUpdated);
	},
	componentWillUnmount:function()
	{
		InformerStore.removeInformerChangeListener(this._storeUpdated);
	},
	render:function()
	{
		return <li><a href="#" id="informer">{this.state.text}</a></li>;
	},
	_storeUpdated:function()
	{
		this.setState({
			text:InformerStore.getText()
		});
	}
});

export default Informer;