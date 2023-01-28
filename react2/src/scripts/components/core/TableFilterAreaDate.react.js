"use strict";

import React from "react";
import ReactDOM from "react-dom";

import TableStore from "../../stores/TableStore";

import TableFilterActionCreator from "../../actions/TableFilterActionCreator";

import {FormatDateInt as FormatDate} from "../../common/DateAddons";

class TableFilterAreaDate extends React.Component{
    constructor (props) {
        super(props);
		let filter=TableStore.getFilter(this.props["data-table-id"], this.props["data-field-name"]);
		if (filter!=null)
		{
			this.state= {
				startDate:FormatDate(filter.startDate),
				endDate:FormatDate(filter.endDate)
			};
		}
		else
		{
			this.state= {
				startDate:null,
				endDate:null
			};
		}
	} 
	componentDidMount()
	{
		$("select").material_select();
	}

	render(){
		return 	<div>
					<div style={{display:"flex", flexDirection:"column"}}>
						<div style={{margin:"6px 0px 10px 0px", display:"flex", flexDirection:"row"}}>
							<span style={{width:30+"px"}}>С: </span>
							<input type="date" value={this.state.startDate} onChange={this._startDateChange.bind(this)}></input>
						</div>
						<div style={{margin:"6px 0px 10px 0px", display:"flex", flexDirection:"row"}}>
							<span style={{width:30+"px"}}>По: </span>
							<input type="date" value={this.state.endDate} onChange={this._endDateChange.bind(this)}></input>
						</div>
						<a className="waves-effect waves-light btn" onClick={this._onClick.bind(this)}>Применить</a>
					</div>
				</div>;
	}
	_startDateChange(event)
	{
		this.setState({
			startDate:event.currentTarget.value
		});
	}
	_endDateChange(event)
	{
		this.setState({
			endDate:event.currentTarget.value
		});
	}
	_onClick(event)
	{
		if (this.state.startDate>""||this.state.endDate>"")
		{
			let startDate=(this.state.startDate>"")?new Date(this.state.startDate):null;
			let endDate=(this.state.endDate>"")?new Date(this.state.endDate):null;
			let endDateEdge=null;
			if (endDate!=null)
			{
				endDateEdge=new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+1);
			}
			TableFilterActionCreator.filter(this.props["data-table-id"], this.props["data-field-name"], {startDate:startDate, endDate:endDate, endDateEdge:endDateEdge});
		}
		else
		{
			TableFilterActionCreator.filter(this.props["data-table-id"], this.props["data-field-name"], null);
		}
		ReactDOM.unmountComponentAtNode(document.getElementById(this.props["data-table-id"]+"Svc"));
	}
};

export default TableFilterAreaDate;