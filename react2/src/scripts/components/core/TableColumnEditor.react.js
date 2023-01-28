"use strict";

import React from "react";
import ReactDOM from "react-dom";

import TableStore from "../../stores/TableStore";
import TableColumnSetVisibilityActionCreator from "../../actions/TableColumnSetVisibilityActionCreator";

let TableColumnEditor=React.createClass({
	getInitialState:function()
	{
		return {
			allCols:[]
		};
	},
	componentDidMount:function()
	{
		let allCols=TableStore.getAllHeaders(this.props["data-table-id"]);
		this.setState(
			{
				allCols:allCols
			});
		this._getNewCols(allCols);
		TableStore.addTableChangeListener(this.props["data-table-id"], this._getNewCols);
	},
	componentWillUnmount:function()
	{
		TableStore.removeTableChangeListener(this.props["data-table-id"], this._getNewCols);
	},
	render:function()
	{
		let cells=this.state.allCols
					.filter(item=>item.isVisible!==false)
					.sort((item1, item2)=>{
						if (item1.caption.toUpperCase()<item2.caption.toUpperCase())
						{
							return -1;
						}
						else
						{
							if (item1.caption.toUpperCase()>item2.caption.toUpperCase())
							{
								return 1;
							}
							return 0;
						}
					})
					.map(item=>{
						return 	<li className="collection-item" key={item.fieldName}>
									<input 	type="checkbox" 
											id={this.props["data-table-id"]+"CE"+item.fieldName} 
											className="filled-in" 
											checked={item.isCurrentVisible?"checked":null} 
											data-field-name={item.fieldName}
											onChange={this._onChange}>
									</input>
									<label htmlFor={this.props["data-table-id"]+"CE"+item.fieldName}>{item.caption}</label>
								</li>;
					}/*.bind(this)*/);

		return 	<div className="card z-depth-2" style={{width:this.props.width}}>
					<div style={{margin:"4px 6px 0px 6px", display:"flex", justifyContent:"space-between"}} className="bolded-text" >
						<div style={{marginRight:20+"px"}}>Состав колонок</div>
						<i className="mdi-navigation-close" onClick={this._onCloseClick}></i>
					</div>
					<div className="card-content" style={{maxHeight:300+"px", overflowY:"auto"}}>		
						<ul className="collection with-header">				
							{cells}
						</ul>
					</div>
				</div>;
	},
	_onCloseClick:function(event)
	{
		event.preventDefault();
		event.stopPropagation();
		ReactDOM.unmountComponentAtNode(document.getElementById(this.props["data-table-id"]+"Svc"));
	},
	_onChange:function(event)
	{
		TableColumnSetVisibilityActionCreator.setVisibility(this.props["data-table-id"], event.currentTarget.dataset.fieldName, event.currentTarget.checked);
		event.stopPropagation();
	},
	_getNewCols:function(allCols)
	{
		if (allCols==null)
		{
			allCols=this.state.allCols;
		}
		let processedCols=TableStore.getHeaders(this.props["data-table-id"]);
		for(let elem of allCols)
		{
			let processed=processedCols.filter(item=>{return item.fieldName==elem.fieldName});
			elem.isCurrentVisible=(processed.length>0&&processed[0].isVisible);
		}
		this.setState({
			allCols:allCols
		});
	}
});

export default TableColumnEditor;