"use strict";

import React from "react";

import TableStore from "../../stores/TableStore";

import TableServiceArea from "./TableServiceArea.react";
import TableHeader from "./TableHeader.react";
import TableRow from "./TableRow.react";
import TablePaginator from "./TablePaginator.react";
import TableFilterViewer from "./TableFilterViewer.react";

import TableGetDataStartActionCreator from "../../actions/TableGetDataStartActionCreator";
import TableGetDataEndActionCreator from "../../actions/TableGetDataEndActionCreator";

import TablePageResizeActionCreator from "../../actions/TablePageResizeActionCreator";
import TablePageSwitchActionCreator from "../../actions/TablePageSwitchActionCreator";
import TableDestroyActionCreator from "../../actions/TableDestroyActionCreator";

let Table=React.createClass({
	getInitialState:function()
	{
		return Object.assign({}, this._getDefaultState(), {
			'maxHeight':(this.props.style&&this.props.style["maxHeight"])?this.props.style["maxHeight"]:null,
			width:(this.props.style&&this.props.style.width)?this.props.style.width:null
		});
	},
	componentDidMount:function()
	{
		TableStore.addTableChangeListener(this.props["data-table-id"], this._onTableChanged);
		TableStore.addProcessedHeadersChangeListener(this.props["data-table-id"], this._onHeadersChanged);

		if (!(this.props.skipAutoLoad===true))
		{
			this._requestData(this.props["data-table-controller"], this.props.conditionObj);
		}
		this.setState({
			controller:this.props["data-table-controller"]
		});

		$(".tooltipped").tooltip({delay: 50});
	},
	componentWillReceiveProps:function(nextProps)
	{
		if (nextProps.lockData===true)
			return;
		this._requestData(nextProps["data-table-controller"], nextProps.conditionObj);
		this.setState({
			controller:nextProps["data-table-controller"]
		});
	},
	shouldComponentUpdate:function(nextProps, nextState)
	{
		return !(nextProps.lockData===true);
	},
	componentDidUpdate:function()
	{
		$(".tooltipped").tooltip({delay: 50});
	},
	componentWillUnmount:function()
	{
		TableStore.removeTableChangeListener(this.props["data-table-id"], this._onTableChanged);
		TableStore.removeProcessedHeadersChangeListener(this.props["data-table-id"], this._onHeadersChanged);
		TableDestroyActionCreator.destroy(this.props["data-table-id"]);
	},
	render:function()
	{
		let buttonsCount=0;
		let buttonsColumnWidth=null;
		if (this.props.editModeEnabled === true && this.props.editMode === true) {
		    if (this.props.editButtonsConfig != null) {
		        buttonsCount = GetButtonsCount(this.props.editButtonsConfig, this.state.data, this.props["data-table-id"]);
		    }
		}
	    if (this.props.buttonsConfig!=null) {
		    buttonsCount = GetButtonsCount(this.props.buttonsConfig, this.state.data, this.props["data-table-id"]);
	    }
	    if (buttonsCount>0)
	    {
	        buttonsColumnWidth=buttonsCount*32;
	    }
		let tableRows=this.state.data.map(function(rowData)
			{
				let rowStyle=null;
				if (typeof this.props.rowStyleMod=="function")
				{
					rowStyle=this.props.rowStyleMod(this.props["data-table-id"], rowData.keyFieldValue);
				}
				else
				{
					if (typeof this.props.rowStyleMod=="object")
					{
						rowStyle=this.props.rowStyleMod;
					}
				}
				return 	<TableRow 	data-table-id={this.props["data-table-id"]} 
									key={rowData.keyFieldValue} 
									data-header-data={this.state.headers} 
									data-row-data={rowData.rowData} 
									data-id={rowData.keyFieldValue}
									hasChildren={rowData.hasChildren}
									data-row-buttons={rowData.rowButtons}
									tabulatorConfig={this.props.tabulatorConfig}
									buttonsConfig={this.props.buttonsConfig}
									buttonsColumnWidth={buttonsColumnWidth}
									selected={TableStore.isRowSelected(this.props["data-table-id"], rowData.keyFieldValue)}
									editMode={TableStore.isRowEdited(this.props["data-table-id"], rowData.keyFieldValue)}
									editButtonsConfig={this.props.editButtonsConfig}
									rowStyle={rowStyle}
									contextMenuConfig={this.props.contextMenuConfig}
									commandCells={this.props.commandCells}
									onDoubleClick={this.props.onRowDoubleClick}
									controllerName={this.props["data-table-controller"]}
									editModeEnabled={this.props.editModeEnabled}>
						</TableRow>
			}.bind(this));
		if (tableRows.length==0)
		{
			tableRows.push(<div key="no=data">Нет данных</div>);
		}
		let tablePaginator=<TablePaginator data-table-id={this.props["data-table-id"]} hidePaginatorIfSinglePage={this.props.hidePaginatorIfSinglePage} onPageSwitch={this.props.onPageSwitch} infoZone={this.props.infoZone}></TablePaginator>;
		let tablePaginator2=null;
		if (this.props.hasPaginatorOnTop===true)
		{
			tablePaginator2=<div style={{'marginBottom':"10px"}}><TablePaginator data-table-id={this.props["data-table-id"]} hidePaginatorIfSinglePage={this.props.hidePaginatorIfSinglePage} onPageSwitch={this.props.onPageSwitch}></TablePaginator></div>;
		}
		let tableFilterText=<TableFilterViewer data-table-id={this.props["data-table-id"]}></TableFilterViewer>;
		return <div style={{display:"flex", flexDirection:"column", width:this.state.width}}>
					{tablePaginator2}
					<div style={{'overflowX':"auto", overflowY:"hidden", display:"block"}}>						
						<TableHeader data-table-id={this.props["data-table-id"]} data-header-data={this.state.headers} buttonsColumnWidth={buttonsColumnWidth}></TableHeader>
						<ul className="collapsible table-body hoverable"
							data-collapsible="expandable"
							style={{'overflowY':"auto", 'overflowX':"hidden", 'maxHeight':this.state["maxHeight"]}}>
							{tableRows}
						</ul>						
					</div>
					<div style={{display:"block", width:0, height:0}}>
						<TableServiceArea data-table-id={this.props["data-table-id"]}></TableServiceArea>
					</div>
					{tablePaginator}
					<div style={{display:"block"}}>
						{tableFilterText}
					</div>					
				</div>;
	},
	_onTableChanged:function()
	{
		this.setState({
			data:TableStore.getData(this.props["data-table-id"]),
			headers:TableStore.getHeaders(this.props["data-table-id"])
		});
	},
	_onHeadersChanged:function()
	{
		this.setState({
			headers:TableStore.getHeaders(this.props["data-table-id"])
		});
	},
	_requestData:function(controller, conditionObj)
	{
		if (controller==undefined)
		{
			controller=null;
		}
		if (controller!=this.state.controller||conditionObj!=null)
		{
			if (controller!=null)
			{
				TablePageResizeActionCreator.pageResize(this.props["data-table-id"], this.props["itemsPerPage"]);
				TablePageSwitchActionCreator.pageSwitch(this.props["data-table-id"], 0);
				/*this.setState({
					data:[],
					headers:[]
				});*/
				TableGetDataEndActionCreator.getDataEnd(this.props["data-table-id"], {data:[], headers:[], settings:null});
				let canParallize=false;
				if (this.props.canParallize==true)
				{
					canParallize=true;
				}
				TableGetDataStartActionCreator.getDataStart(this.props["data-table-id"], controller, canParallize, conditionObj);
			}
			else
			{
				this.setState(this._getDefaultState());
			}
		}
	},
	_getDefaultState:function()
	{
		return {
			controller:null,
			data:[],
			headers:[],
		};
	}
});

function GetButtonsCount(buttonsConfig, data, tableId) {
    let buttonsCount=data.reduce((prev, rowData)=>{
        let cnt=buttonsConfig.reduce((prev, curr)=>{
            curr.ownerId=tableId;
            if (curr.isVisible==null)
            {
                return prev+1;
            }
            if (typeof curr.isVisible=="boolean")
            {
                if (curr.isVisible) {
                    return prev+1;
                }
                return prev;
            }
            if (typeof curr.isVisible=="function")
            {
                if (curr.isVisible(rowData.keyFieldValue, curr)) {
                    return prev+1;
                }
                return prev;
            }
            return prev + 1;
        }, 0);
        return cnt > prev ? cnt : prev;
    }, 0);
    return buttonsCount;
}

export default Table;