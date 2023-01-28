"use strict";

import React from "react";

import TabulatorStore from "../../stores/TabulatorStore";

let TabulatorHeader=React.createClass({
	componentWillMount:function()
	{
		TabulatorStore.addPageSwitchListener(this.props["tabulator-id"], this._onPageSwitch);
		TabulatorStore.addPageChangeListener(this.props["tabulator-id"], this._onChange);
		this.setState({
			isActive:TabulatorStore.getActiveTabId(this.props["tabulator-id"])==this.props["item-id"],
			captionPostfix:null
		});
	},
	componentWillUnmount:function()
	{
		TabulatorStore.removePageSwitchListener(this.props["tabulator-id"], this._onPageSwitch);
		TabulatorStore.removePageChangeListener(this.props["tabulator-id"], this._onChange);
	},
	render:function()
	{
		return 	<li className="tab col">
					<a href={"#"+this.props["id"]} className={this.state.isActive?"active":null} onClick={this._onClick}>
						{this.props.caption+((this.state.captionPostfix!=null)?(" ("+this.state.captionPostfix+")"):"")}
					</a>
				</li>;
	},
	_onPageSwitch:function()
	{
		this.setState({
			isActive:TabulatorStore.getActiveTabId(this.props["tabulator-id"])==this.props["item-id"]
		});
	},
	_onClick:function(event)
	{
		event.stopPropagation();
		event.preventDefault();
	},
	_onChange:function()
	{
		this.setState({
			captionPostfix:TabulatorStore.getCaptionPostfix(this.props["tabulator-id"], this.props["item-id"])
		})
	}
});

export default TabulatorHeader;