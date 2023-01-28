"use strict";

import React from "react";

import Table from "../core/Table.react";
import DropDownList from "../core/DropDownList.react";

import DropDownListStore from "../../stores/DropDownListStore";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.common";

let DictViewer=React.createClass({
	getDefaultProps:function()
	{
		return {
			tableId:"mainTable",
			controller:"Condition",
			tableClassName:"bordered hoverable"
		};
	},
	getInitialState:function()
	{
		return {
			controller:null
		};
	},
	componentDidMount:function()
	{
		DropDownListStore.addListSelectListener("dictSelector", this._onDictSelect);
	},
	componentWillUnmount:function()
	{
		DropDownListStore.removeListSelectListener("dictSelector", this._onDictSelect);
	},
	render:function()
	{
		let tableContextMenuConfig={
			mountPoint:"dictViewTableSvc",
			items:[
				{
					key:"ShowColumnEditor",
					onClick:(event, props)=>{
						ContextMenuItemsCommon.showColumnEditor(event, props);
						},
					caption:"Состав колонок",
					mountPoint:"dictViewTableSvc"
				}
			]
		};
		return 	<div className="card" style={{'minHeight':80+"vh"}}>
					<div className="card-content">
						<div style={{margin:"0 0 10px 0"}}>
							<DropDownList data-list-id="dictSelector" data-list-controller="dict/DictList" data-list-def-txt="Выберите справочник" style={{width:450+"px"}}></DropDownList>
						</div>
						<div className="divider"></div>
						<div style={{margin:"10px 0 10px 0"}}>
							<Table  data-table-id="dictViewTable"
									data-table-controller={this.state.controller} 
									className={this.props.tableClassName} 
									style={{'maxHeight':450+"px", width:100+"%"}} 
									itemsPerPage="5"
									canParallize={true}
									contextMenuConfig={tableContextMenuConfig}>
							</Table>
						</div>
					</div>
				</div>;
	},
	_onDictSelect:function()
	{
		let item=DropDownListStore.getSelectedItem("dictSelector");
		let controller=(item)?("dict/"+item.key):null;
		this.setState({
			controller:controller
		});
	}
});

export default DictViewer;