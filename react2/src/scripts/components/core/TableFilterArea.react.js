"use strict";

import React from "react";
import ReactDOM from "react-dom";

import TableFilterAreaNumber from "./TableFilterAreaNumber.react";
import TableFilterAreaString from "./TableFilterAreaString.react";
import TableFilterAreaDate from "./TableFilterAreaDate.react";
import TableFilterAreaList from "./TableFilterAreaList.react";
import Movable from "./Movable.react";

let TableFilterArea=React.createClass({
	render:function()
	{
		let elem=null;
		if (this.props.filterType=="list")
		{
			elem=<TableFilterAreaList table-id={this.props["data-table-id"]} field-name={this.props["data-field-name"]}></TableFilterAreaList>;
		}
		else
		{
			switch(this.props["data-type"])
			{
				case "string":
					elem=<TableFilterAreaString data-table-id={this.props["data-table-id"]} data-field-name={this.props["data-field-name"]}></TableFilterAreaString>;
					break;
				case "date":
					elem=<TableFilterAreaDate  data-table-id={this.props["data-table-id"]} data-field-name={this.props["data-field-name"]}></TableFilterAreaDate>;
					break;
				case "boolean":
					elem=<TableFilterAreaList  table-id={this.props["data-table-id"]} field-name={this.props["data-field-name"]}></TableFilterAreaList>;
					break;
				case "number":
					elem=<TableFilterAreaNumber  data-table-id={this.props["data-table-id"]} data-field-name={this.props["data-field-name"]}></TableFilterAreaNumber>;
					break;
				default:
					elem=<TableFilterAreaString  data-table-id={this.props["data-table-id"]} data-field-name={this.props["data-field-name"]}></TableFilterAreaString>;
					break;
			}
		}
		return 	<Movable startX={this.props.startX} startY={this.props.startY} position={this.props.position}>
					<div className="card" style={{width:this.props.width}}>
						<div style={{margin:"4px 6px 0px 6px", display:"flex", justifyContent:"space-between"}} className="bolded-text" >
							<div>{this.props["data-field-caption"]}</div>
							<i className="mdi-navigation-close" onClick={this._onCloseClick}></i>
						</div>
						<div className="card-content">						
							{elem}
						</div>
					</div>
				</Movable>;
	},
	_onCloseClick:function(event)
	{
		event.preventDefault();
		event.stopPropagation();
		ReactDOM.unmountComponentAtNode(document.getElementById(this.props["data-table-id"]+"Svc"));
	},
	
});

export default TableFilterArea;