"use strict";

import React from "react";

import TableFilterButton from "./TableFilterButton.react.js";

import TableColumnResizeActionCreator from "../../actions/TableColumnResizeActionCreator";
import TableColumnMoveActionCreator from "../../actions/TableColumnMoveActionCreator";
import TableSortActionCreator from "../../actions/TableSortActionCreator";

let TableHeader=React.createClass({
	getInitialState:function()
	{
		return this._getState();
	},
	render:function()
	{
		//data fields
	    let cells=[];
	    let bw=0;
	    if (this.props.buttonsColumnWidth!=null)
		{
			bw=this.props.buttonsColumnWidth; // one icon=30px default
			cells.push(<div key="__btns__" style={{'minWidth':bw, 'maxWidth':bw, width:bw}}></div>);
		}
		let fullWidth=bw;
	    this.props["data-header-data"].forEach(function(value){
	    	fullWidth=fullWidth+value.width;
	    	let sorted=null;
	    	switch(value.sortOrder)
			{
				case 1:
					sorted=<i className="mdi-navigation-arrow-drop-up"></i>;
					break;
				case -1:
					sorted=<i className="mdi-navigation-arrow-drop-down"></i>;
					break;
				default:
					break;
			}							
			let elem=	<div key={value.fieldName} data-field-name={value.fieldName}
							style={{'minWidth':value.width, 'maxWidth':value.width, width:value.width}}
							onMouseDown={this._headerMouseDown}>
							<div className="truncate">
								{sorted} {value.caption}
							</div>
							<div></div>
							<TableFilterButton data-table-id={this.props["data-table-id"]} data-field-name={value.fieldName} data-field-caption={value.caption} filterType={value.filterType}></TableFilterButton>
							<div  	data-field-name={value.fieldName} 
									onMouseDown={this._startResize}>
							</div>
						</div>;
			cells.push(elem);
		}.bind(this));
		if (this.props["data-header-data"].length>0)
		{
			cells[cells.length]=scroll;
			return <div className="table-header" style={{width:fullWidth}}>{cells}</div>;
		}
		else
		{
			return null;
		}
	},
	_getState:function()
	{
		return {
			resizeTarget:null,
			resizeStartX:null,
		};
	},
	_startResize:function(event)
	{
		event.preventDefault();
		event.stopPropagation();
		let fieldName=event.target.dataset.fieldName;
		this.setState({
			resizeTarget:fieldName,
			resizeStartX:event.clientX,
			movedTh:null,
			status:null
		});
		document.addEventListener("mouseup", this._endResize);
		document.addEventListener("mousemove", this._processResize);
		document.body.style.cursor="col-resize";
		document.body.classList.add("no-select");
	},
	_processResize:function(event)
	{
		let _fields=this.props["data-header-data"];
		let item=_fields.filter(function(val)
		{
			return val.fieldName==this.state.resizeTarget
		}.bind(this))[0];
		if (item)
		{
			let width=item.width+event.clientX-this.state.resizeStartX;
			if (width<7)
			{
				width=7;
			}
			this.setState({resizeStartX:event.clientX});
			TableColumnResizeActionCreator.tableColumnResize(this.props["data-table-id"], this.state.resizeTarget, width);		
		}
	},
	_endResize:function(event)
	{
		event.preventDefault();
		event.stopPropagation();
		this.setState({
			resizeTarget:null,
			resizeStartX:null,
		});
		document.body.style.cursor="default";
		document.body.classList.remove("no-select");
		document.removeEventListener("mousemove", this._processResize);
		document.removeEventListener("mouseup", this._endResize);
	},
	_headerMouseDown:function(event)
	{
		event.preventDefault();
		event.stopPropagation();
		let fieldName=event.currentTarget.dataset.fieldName;
		let item=this.props["data-header-data"].filter(function(value){
			return value.fieldName==fieldName;
		})[0];
		let headerIndex=this.props["data-header-data"].indexOf(item);
		this.setState({
			resizeTarget:headerIndex,
			resizeStartX:event.clientX,
			movedTh:event.currentTarget,
			status:null
		});
		document.addEventListener("mouseup", this._mouseUp);
		document.addEventListener("mousemove", this._processColumnMove);
		document.body.classList.add("no-select");
	},
	_processColumnMove:function(event)
	{
		let shift=event.clientX-this.state.resizeStartX;
		if (shift==0)
		{
			return;
		}
		let item=this.props["data-header-data"][this.state.resizeTarget];
		let movedTh=this.state.movedTh;
		if (!(this.state.status=="move"))
		{
			this.setState({
				status:"move"
			});
			movedTh.style.position="relative";
			movedTh.classList.add("shadow");
			movedTh.classList.add("z-depth-1");			
		}
		
		movedTh.style.left=shift+"px";
		let nextItem=null;
		if (shift<0)
		{
			nextItem=this.props["data-header-data"][this.state.resizeTarget-1];
		}
		else if (shift>0)
		{
			nextItem=this.props["data-header-data"][this.state.resizeTarget+1];
		};
		if (!nextItem)
		{
			movedTh.style.left=null;
			return;
		};
		if (Math.abs(shift)>=nextItem.width)
		{
			movedTh.style.left=null;
			TableColumnMoveActionCreator.tableColumnMove(this.props["data-table-id"], this.state.resizeTarget, (shift>0)?1:-1);
			let headerIndex=this.props["data-header-data"].indexOf(this.props["data-header-data"].filter(value=>{return value.fieldName==item.fieldName})[0]);
			this.setState({
				resizeTarget:headerIndex,
				resizeStartX:event.clientX
			});
		}
	},
	_mouseUp:function(event)
	{
		let item=this.props["data-header-data"][this.state.resizeTarget];
		switch (this.state.status)
		{
			case "move": //column dragging				
				let movedTh=this.state.movedTh;
				movedTh.style.position=null;
				movedTh.classList.remove("shadow");
				movedTh.classList.remove("z-depth-1");
				this.setState({
					resizeTarget:null,
					resizeStartX:null,
					movedTh:null
				});
				break;
			case null: //column mouse down, but w/o moving - then sort table
				TableSortActionCreator.sort(this.props["data-table-id"], item.fieldName, (!item.sortOrder||item.sortOrder==0)?1:-item.sortOrder);
				break;
			default:
				break;
		}
		document.body.style.cursor="default";
		document.body.classList.remove("no-select");
		document.removeEventListener("mousemove", this._processColumnMove);
		document.removeEventListener("mouseup", this._mouseUp);
	}
});

export default TableHeader;