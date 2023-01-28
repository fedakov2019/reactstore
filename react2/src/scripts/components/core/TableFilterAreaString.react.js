"use strict";

import React from "react";
import ReactDOM from "react-dom";

import TableStore from "../../stores/TableStore";

import TableFilterActionCreator from "../../actions/TableFilterActionCreator";

class TableFilterAreaString extends React.Component{
	constructor (props) {
	    super(props);
		let filter=TableStore.getFilter(this.props["data-table-id"], this.props["data-field-name"]);
		if (!filter)
		{
			this.state= {
				selOpt:"1", 
				text:"",
				showEmpty:false
			};
		}
		else
		{
			let selOpt="1";
			let text="";
			let showEmpty=false;
			if (filter.regExp!=null)
			{
				if (filter.regExp.source[0]=="^")
				{
					text=filter.regExp.source.substr(1);
				}
				else
				{
					text=filter.regExp.source;
					selOpt="2";
				}
			}
			if (filter.showEmpty)
			{
				showEmpty=true;
			}
			this.state= {
				selOpt:selOpt, 
				text:text,
				showEmpty:showEmpty
			};	
		}
	}

	componentDidMount()
	{
		$("select").material_select();
	}

	render(){
		let selOpts=[];
		selOpts.push(<option value="1" key="1">Начинается с</option>);
		selOpts.push(<option value="2" key="2">Содержит</option>);
		
		let checkbox;
		if (this.state.showEmpty)
		{
			checkbox=<div>
						<input type="checkbox" className="filled-in" id="filled-in-box" defaultChecked="checked"></input>
      					<label htmlFor="filled-in-box"  onClick={this._showEmptyChange.bind(this)}>Показать пустые</label>
      				</div>;
		}
		else
		{
			checkbox=<div>
						<input type="checkbox" className="filled-in" id="filled-in-box"></input>
      					<label htmlFor="filled-in-box"  onClick={this._showEmptyChange.bind(this)}>Показать пустые</label>
      				</div>;
		}
		return 	<div>
					<div style={{display:"flex", flexDirection:"column"}}>
						<div style={{display:"flex", flexDirection:"column"}}>
							<select onChange={this._selectOptionsChange.bind(this)} className="browser-default" defaultValue={this.state.selOpt}>
								{selOpts}
							</select>
							<input type="text" value={this.state.text} onChange={this._filterInputText.bind(this)} style={{margin:"6px 0px 3px 0px"}}></input>
						</div>
						<div style={{margin:"6px 0px 10px 0px"}}>
							{checkbox}
						</div>
						<a className="waves-effect waves-light btn" onClick={this._onClick.bind(this)}>Применить</a>
					</div>
				</div>;
	}

	_filterInputText(event)
	{
		this.setState({text:event.currentTarget.value});
	}

	_selectOptionsChange(event)
	{
		this.setState({selOpt:event.currentTarget.value});
	}

	_showEmptyChange(event)
	{
		this.setState({showEmpty:!this.state.showEmpty});
	}

	_onClick(event)
	{
		if (this.state.text>""||this.state.showEmpty)
		{
			let regExp=null;
			let showEmpty=false;
			if (this.state.text>"")
			{
				switch(this.state.selOpt)
				{
					case "1":
						regExp=new RegExp("^"+this.state.text, "i");
						break;
					case "2":
						regExp=new RegExp(this.state.text, "i");
						break;
					default:
						break;
				}
			}
			TableFilterActionCreator.filter(this.props["data-table-id"], this.props["data-field-name"], {regExp:regExp, showEmpty:this.state.showEmpty});
		}
		else
		{
			TableFilterActionCreator.filter(this.props["data-table-id"], this.props["data-field-name"], null);
		}
		ReactDOM.unmountComponentAtNode(document.getElementById(this.props["data-table-id"]+"Svc"));
	}
};

export default TableFilterAreaString;