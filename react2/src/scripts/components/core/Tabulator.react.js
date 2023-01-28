"use strict";

import React from "react";

import TabulatorHeader from "./TabulatorHeader.react";
import TabulatorContainer from "./TabulatorContainer.react";
import TabulatorPageSwitchActionCreator from "../../actions/TabulatorPageSwitchActionCreator";
import TabulatorDestroyActionCreator from "../../actions/TabulatorDestroyActionCreator";

class Tabulator extends React.Component{
	componentWillMount()
	{
		let config=this.props.config.sort((item1, item2)=>{
			if (item1.order<item2.order)
			{
				return -1;
			}
			if (item1.order>item2.order)
			{
				return 1;
			}
			return 0;
		});
		let activeTabId=null;
		if (config.length>1||config[0].caption>"")
		{
			config.forEach(item=>{
				if (activeTabId==null||item.isActive==true)
				{
					activeTabId=item.id;
				}
			});
		}
		else
		{
			activeTabId=config[0].id;
		}
		TabulatorPageSwitchActionCreator.pageSwitch(this.props["data-id"], activeTabId);

	}

	componentDidMount()
	{
		$(document).ready(function(){
	    	$("ul.tabs").tabs();
		});
	}

	componentWillUnmount()
	{
		TabulatorDestroyActionCreator.destroy(this.props["data-id"]);
	}

	render() {
	    let config=this.props.config.sort((item1, item2)=>{
			if (item1.order<item2.order)
			{
				return -1;
			}
			if (item1.order>item2.order)
			{
				return 1;
			}
			return 0;
		})
		.filter(item=>{
			if (item.isVisible==undefined||item.isVisible==null||item.isVisible==true||(typeof item.isVisible=="function"&&item.isVisible(item)))
			{
				return true;
			}
			return false;
		});
		let headers=null;
		if (config.length>1||config[0].caption>"")
		{
			let headerList=config.map(item=>{
				return 	<TabulatorHeader 	key={item.id} 
											id={this.props["data-id"]+"_"+item.id} 
											item-id={item.id} 
											tabulator-id={this.props["data-id"]}
											hideEmpty={this.props.hideEmpty}
											caption={item.caption}>
						</TabulatorHeader>;
			}/*.bind(this)*/);
			headers=<div className="col s12" style={this.props.headersStyle}>
						<ul className="tabs">
							{headerList}
						</ul>
					</div>;
		}
		let containers=config.map(item=>{
			return 	<TabulatorContainer key={item.id} 
										id={this.props["data-id"]+"_"+item.id} 
										item-id={item.id} 
										tabulator-id={this.props["data-id"]} 
										type={item.type} 
										config={item.config}
										hideEmpty={this.props.hideEmpty}
										elem={item.elem}>
					</TabulatorContainer>;
		}/*.bind(this)*/);

		return 	<div id={this.props["data-id"]} style={this.props.style}>
					{headers}
					{containers}
				</div>;
	}
};

export default Tabulator;