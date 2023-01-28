"use strict";

import React from "react";

import TabulatorPageSetCaptionPostfixActionCreator from "../../actions/TabulatorPageSetCaptionPostfixActionCreator";

import Table from "./Table.react";
import TableStore from "../../stores/TableStore";

import OnkoStruct from "../shared/OnkoStruct.react";

let TabulatorContainer=React.createClass({
	componentWillMount:function()
	{
		switch(this.props.type)
		{
			case "Table":
				TableStore.addTableChangeListener(this.props.config["data-table-id"]+"$"+this.props.id+"_viewport", this._onTableChange);
				break;
			default:
				break;
		}		
	},
	componentWillUnmount:function()
	{
		switch(this.props.type)
		{
			case "Table":
				TableStore.removeTableChangeListener(this.props.config["data-table-id"]+"$"+this.props.id+"_viewport", this._onTableChange);
                break;
			default:
				break;
		}		
	},
	render:function() {
	    //if (this.state.activeTabId==this.props['item-id'])
		{
			let elem="UNKNOWN!!";
			switch(this.props.type)
			{
				case "Table":
					{
						elem = <Table {...this.props.config} data-table-id={this.props.config["data-table-id"]+"$"+this.props.id+"_viewport"}>
								</Table>;
					}
                    break;
                case "OnkoStruct":
                {
                    elem = <OnkoStruct {...this.props} id={"OnkoStruct" + "$" + this.props.id + "_viewport"}>
                        </OnkoStruct>;
				}
				default:
				    if (this.props.elem instanceof React.constructor) {
				        elem = this.props.elem;
				    }
			}
			
			return 	<div id={this.props.id} className="col s12" style={{padding:10+"px"}}>
						{elem}
					</div>;
		}
		/*else 
		{
			return null;
		}*/
	},
	_onTableChange:function()
	{
		setTimeout(function(){
			let rowCount=TableStore.getRowCount(this.props.config["data-table-id"]+"$"+this.props.id+"_viewport");
			TabulatorPageSetCaptionPostfixActionCreator.setCaptionPostfix(this.props["tabulator-id"], this.props["item-id"], rowCount);
		}.bind(this),0);
	}/*,
	_onPageSwitch:function()
	{
		this.setState({
			activeTabId:TabulatorStore.getActiveTabId(this.props['tabulator-id'])
		});
	}*/
});

export default TabulatorContainer;