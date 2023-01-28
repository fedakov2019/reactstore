"use strict";

import React from "react";
import ReactDOM from "react-dom";

import TableStore from "../../stores/TableStore";

import TableFilterActionCreator from "../../actions/TableFilterActionCreator";

class TableFilterAreaNumber extends React.Component{
    constructor(props) {
        super(props);
		let filter=TableStore.getFilter(this.props["data-table-id"], this.props["data-field-name"]);
		if (filter!=null)
		{
			this.state= {
				maxValue:filter.maxValue,
				minValue:filter.minValue
			};			
		}
		else
		{
			this.state= {
				maxValue:null,
				minValue:null
			}
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
							<input type="text" value={this.state.minValue!=null?this.state.minValue:""} onChange={this._minChange.bind(this)}></input>
						</div>
						<div style={{margin:"6px 0px 10px 0px", display:"flex", flexDirection:"row"}}>
							<span style={{width:30+"px"}}>По: </span>
							<input type="text" value={this.state.maxValue!=null?this.state.maxValue:""} onChange={this._maxChange.bind(this)}></input>
						</div>
						<a className="waves-effect waves-light btn" onClick={this._onClick.bind(this)}>Применить</a>
					</div>
				</div>;
	}

	_minChange(event)
	{
		this.setState({
			minValue:CheckNumber(event.currentTarget.value, this.state.minValue)
		});
	}

	_maxChange(event)
	{
		this.setState({
			maxValue:CheckNumber(event.currentTarget.value, this.state.maxValue)
		});
	}

	_onClick(event)
	{
		if (this.state.minValue!=null||this.state.maxValue!=null)
		{
			TableFilterActionCreator.filter(this.props["data-table-id"], this.props["data-field-name"], {
				minValue:this.state.minValue!=null?Number(this.state.minValue):null, 
				maxValue:this.state.maxValue!=null?Number(this.state.maxValue):null
			});
		}
		else
		{
			TableFilterActionCreator.filter(this.props["data-table-id"], this.props["data-field-name"], null);
		}
		ReactDOM.unmountComponentAtNode(document.getElementById(this.props["data-table-id"]+"Svc"));
	}
};


function CheckNumber(newVal, oldVal)
{
	if (newVal==null||newVal=="")
	{
		return null;
	}
	let tmp=Number(newVal);
	if (isNaN(tmp))
	{
		return oldVal;
	}
	return newVal;
}
export default TableFilterAreaNumber;