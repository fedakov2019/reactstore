"use strict";

import React from "react";

import DropDownListStore from "../../stores/DropDownListStore";

import DropDownListGetDataStartActionCreator from "../../actions/DropDownListGetDataStartActionCreator";
import DropDownListSelectItemActionCreator from "../../actions/DropDownListSelectItemActionCreator";
import DropDownListDestroyActionCreator from "../../actions/DropDownListDestroyActionCreator";

let DropDownList=React.createClass({
	getInitialState:function()
	{
		return {
			items:DropDownListStore.getData(this.props["data-list-id"]),
			selectedItem:DropDownListStore.getSelectedItem(this.props["data-list-id"])
		};
	},
	componentWillMount:function()
	{
		DropDownListStore.addListChangeListener(this.props["data-list-id"], this._onChange);		
		DropDownListStore.addListSelectListener(this.props["data-list-id"], this._onSelect);
		DropDownListGetDataStartActionCreator.getDataStart(this.props["data-list-id"], this.props["data-list-controller"]);
	},
	componentDidMount:function()
	{
		if (this.props.idSelected!=null)
		{
			DropDownListSelectItemActionCreator.selectItem(this.props["data-list-id"], this.props.idSelected);
		}
		$("#"+this.props["data-list-id"]+"Btn").dropdown({
	      		inDuration: 300,
				outDuration: 225,
				constrain_width: false,
				hover: false,
				gutter: 0, 
				belowOrigin: true
			}
		);
    },

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.selectedItem == null || this.state.selectedItem == null || nextProps["data-list-controller"] !== this.props["data-list-controller"]) {
            return true;
        }
        return nextState.selectedItem.key !== this.state.selectedItem.key;
    },

	componentDidUpdate() {
        if (this.props.onChange != null && this.state.selectedItem != null) {
            this.props.onChange(this.props, this.state, this.state.selectedItem.key);
        }
    },

	componentWillUnmount: function ()
	{
		DropDownListStore.removeListChangeListener(this.props["data-list-id"], this._onChange);
		DropDownListStore.removeListSelectListener(this.props["data-list-id"], this._onSelect);
		DropDownListDestroyActionCreator.destroy(this.props["data-list-id"]);
	},
	render:function()
	{
		let text=(this.state.selectedItem)?this.state.selectedItem.value:(this.props["data-list-def-txt"]?this.props["data-list-def-txt"]:"-----------");
		return 	<div>
					<a id={this.props["data-list-id"]+"Btn"} className="dropdown-button btn truncate" style={this.props.style} href="#" data-activates={this.props["data-list-id"]+"Ul"}>
						{text}
  					</a>
					<ul id={this.props["data-list-id"]+"Ul"} className="dropdown-content">
						{
							this.state.items.map(function(value)
								{
									return <li key={value.key} data-key={value.key} onClick={this._onClick}><a href="#">{value.value}</a></li>
								}.bind(this))
						}
  					</ul>
				</div>;
	},
	_onChange:function()
	{
		this.setState({
			items:DropDownListStore.getData(this.props["data-list-id"]),
			selectedItem:DropDownListStore.getSelectedItem(this.props["data-list-id"])
		});		
	},
	_onSelect:function()
	{
		this.setState({
			selectedItem:DropDownListStore.getSelectedItem(this.props["data-list-id"])
        });
	},
	_onClick:function(event)
	{
		event.preventDefault();
		event.stopPropagation();
		DropDownListSelectItemActionCreator.selectItem(this.props["data-list-id"], event.currentTarget.dataset.key);
	}
});

export default DropDownList;