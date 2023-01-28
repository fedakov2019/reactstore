"use strict";

import React from "react";

let Movable=React.createClass({
	getInitialState:function()
	{
		return {
			startX:0,
			startY:0,
			clientX:0, 
			clientY:0
		};
	},
	componentWillMount:function()
	{
		this.setState({
			startX:this.props.startX?this.props.startX:0,
			startY:this.props.startY?this.props.startY:0,
			clientX:0, 
			clientY:0
		});
	},
	componentWillReceiveProps:function(nextProps)
	{
		this.setState({
			startX:nextProps.startX?nextProps.startX:0,
			startY:nextProps.startY?nextProps.startY:0,
			clientX:0, 
			clientY:0
		});
	},
	componentWillUnmount:function()
	{
		this._endMoving();
	},
	render:function()
	{
		return <div style={{position:(this.props.position==null?"absolute":this.props.position), left:this.state.startX, top:this.state.startY, zIndex:1}} onMouseDown={this._startMoving}>{this.props.children}</div>;
	},
	_startMoving:function(event)
	{
		document.addEventListener("mouseup", this._endMoving);
		document.addEventListener("mousemove", this._processMoving);
		document.body.style.cursor="move";
		document.body.classList.add("no-select");
		this.setState({
			clientX:event.clientX,
			clientY:event.clientY
		});
	},
	_processMoving:function(event)
	{
		let shiftX=event.clientX-this.state.clientX;
		let shiftY=event.clientY-this.state.clientY;
		this.setState({
			startX:this.state.startX+shiftX,
			startY:this.state.startY+shiftY,
			clientX:this.state.clientX+shiftX,
			clientY:this.state.clientY+shiftY
		});
	},
	_endMoving:function(event)
	{
		document.body.style.cursor="default";
		document.body.classList.remove("no-select");
		document.removeEventListener("mousemove", this._processMoving);
		document.removeEventListener("mouseup", this._endMoving);
	}
});

export default Movable;