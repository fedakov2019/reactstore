"use strict";

import React from "react";

import ErzRepliesStore from "../../stores/ErzRepliesStore";

import Table from "../core/Table.react";

let ErzReplies=React.createClass({
	getInitialState:function()
	{
		return {recordId:-1};
	},
	componentWillMount:function()
	{
		ErzRepliesStore.addShowListener(this._onShowCommand);
	},
	componentWillUnmount:function()
	{
		ErzRepliesStore.removeShowListener(this._onShowCommand);
	},
	componentDidUpdate:function(prevProps, prevState)
	{
		$("#"+this.props.id).openModal();
	},
	render:function()
	{
		let tbl=null;
		if (this.state.recordId>0)
		{
			tbl=<Table {...this.props.tableConfig} conditionObj={{caseId:this.state.recordId, sourceTbl:1}}></Table>
		}
	    return <div id={this.props.id} className="modal">
			   		<div className="modal-content">
			   			{tbl}
			   		</div>
					<div className="modal-footer">			      
						<a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">ОK</a>
					</div>
				</div>;
	},
	_onShowCommand:function()
	{
		let recordId=ErzRepliesStore.getRecordId();
		if (recordId==null||recordId<=0)
			return;
		this.setState({
			recordId:recordId
		});
	}
});

export default ErzReplies;