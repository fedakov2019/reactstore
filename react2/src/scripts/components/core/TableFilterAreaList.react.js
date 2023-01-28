"use strict";

import React from "react";
import ReactDOM from "react-dom";

import TableStore from "../../stores/TableStore";

import TableFilterActionCreator from "../../actions/TableFilterActionCreator";

class TableFilterAreaList extends React.Component{
    constructor (props) {
        super(props);
	    let fieldUniques = TableStore.getFieldUniques(this.props["table-id"], this.props["field-name"])
	        .filter(val => { return val != null; })
	        .sort((val1, val2) => {
	            if (val1 < val2) {
	                return -1;
	            }
	            if (val1 > val2) {
	                return 1;
	            }
	            return 0;
	        });
		let filter=TableStore.getFilter(this.props["table-id"], this.props["field-name"]);
		if (!filter)
		{
			let items={};
			fieldUniques.forEach(val=>{
				items[val]=false;
			});
			this.state= {
				showEmpty:false,
				showNotEmpty:false,
				items:items
			};
		}
		else
		{
			let { showEmpty=false, showNotEmpty=false, items={}}=filter;
			fieldUniques.forEach(val=>{
				if (items[val]===undefined)
				{
					items[val]=false;
				}
			});
			this.state= {
				showEmpty,
				showNotEmpty,
				items
			};	
		}
	}

	render(){
		let cbShowEmpty=<div>
					<input type="checkbox" className="filled-in" id="cbShowEmpty" defaultChecked={this.state.showEmpty?"checked":null}></input>
      				<label htmlFor="cbShowEmpty" onClick={this._showEmptyChange.bind(this)}>Показать пустые</label>
      			</div>;
      	let cbShowNotEmpty=<div>
					<input type="checkbox" className="filled-in" id="cbShowNotEmpty" defaultChecked={this.state.showNotEmpty?"checked":null}></input>
      				<label htmlFor="cbShowNotEmpty" onClick={this._showNotEmptyChange.bind(this)}>Показать непустые</label>
      			</div>;
      	let cbValues=Object.keys(this.state.items)
      		.map((value, index)=>{
      			let id=this.props["table-id"]+"_"+this.props["field-name"]+"_"+index;
	      		return 	<div key={index}>
							<input type="checkbox" className="filled-in" id={id} defaultChecked={this.state.items[value]?"checked":null}></input>
	      					<label htmlFor={id} onClick={this._itemCheckedChange.bind(this)} data-value={value}>{value}</label>
	      				</div>;
	      	});
		return 	<div>
					<div style={{display:"flex", flexDirection:"column"}}>
						{cbShowEmpty}
						{cbShowNotEmpty}
						<div style={{'maxHeight':"250px", 'overflowY':"auto"}}>
							{cbValues}
						</div>
						<a className="waves-effect waves-light btn" onClick={this._onClick.bind(this)}>Применить</a>
					</div>
				</div>;
	}

	_showEmptyChange(event)
	{
		this.setState({showEmpty:!this.state.showEmpty});
						}

	_showNotEmptyChange(event)
	{
		this.setState({showNotEmpty:!this.state.showNotEmpty});
	}

	_itemCheckedChange(event)
	{
		let val=event.currentTarget.dataset.value;
		this.state.items[val]=!this.state.items[val];
	}

	_onClick(event)
	{
		if (this.state.showEmpty||this.state.showNotEmpty||Object.keys(this.state.items).find(val=>{return this.state.items[val]==true;}))
		{
			let items=this.state.items;
			TableFilterActionCreator.filter(this.props["table-id"], this.props["field-name"], {showEmpty:this.state.showEmpty, showNotEmpty:this.state.showNotEmpty, items:items});
		}
		else
		{
			TableFilterActionCreator.filter(this.props["table-id"], this.props["field-name"], null);
		}
		ReactDOM.unmountComponentAtNode(document.getElementById(this.props["table-id"]+"Svc"));
	}
};

export default TableFilterAreaList;