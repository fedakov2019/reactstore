"use strict";

import React from "react";
import ReactDOM from "react-dom";

import Movable from "./Movable.react";

import ContextMenuItem from "./ContextMenuItem.react";

let ContextMenu=React.createClass({
	componentDidMount:function()
	{
		document.addEventListener("click", this._destroyContext)
	},
	render:function()
	{
		let items=this.props.itemsConfig.map(item=>{
			return <ContextMenuItem	ownerId={this.props.ownerId} tableControllerName={this.props.tableControllerName} {...item}></ContextMenuItem>;
		});
		return 	<Movable startX={this.props.startX} startY={this.props.startY}>
					<div className="has-shadow">
						<ul className="collection">
						{items}
						</ul>
					</div>
				</Movable>;
	},
	componentWillUnmount:function()
	{
		document.removeEventListener("click", this._destroyContext);
	},
	_destroyContext:function(event)
	{
	    ReactDOM.unmountComponentAtNode(document.getElementById(this.props.mountPoint));
	}
});

export default ContextMenu;