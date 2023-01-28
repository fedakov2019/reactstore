"use strict";

import React from "react";

import MainMenuGetActionCreator from "../actions/MainMenuGetActionCreator";
import MainMenuStore from "../stores/MainMenuStore";

import UserInfoStore from "../stores/UserInfoStore";
import UserInfoGetActionCreator from "../actions/UserInfoGetActionCreator";

import AppStateStore from "../stores/AppStateStore";
import AppStateAddActionCreator from "../actions/AppStateAddActionCreator";
import AppStateGoLeftActionCreator from "../actions/AppStateGoLeftActionCreator";
import AppStateGoRightActionCreator from "../actions/AppStateGoRightActionCreator";
import AppStateSetupActionCreator from "../actions/AppStateSetupActionCreator";

import MenuItem from "./MenuItem.react";
import MenuUserInfo from "./MenuUserInfo.react";
import MenuNavItem from "./MenuNavItem.react";

import Informer from "./Informer.react";

let MainMenu=React.createClass({
	getInitialState:function(){
		return getStateFromStores();
	},
	componentDidMount:function(){
		MainMenuStore.addChangeListener(this._onChangeMM);
		MainMenuGetActionCreator.mainMenuGet();

		UserInfoStore.addChangeListener(this._onChangeUI);
		UserInfoGetActionCreator.userInfoGet();

		AppStateStore.addChangeListener(this._onMove);

		AppStateSetupActionCreator.setup();
		$(".button-collapse").sideNav(); 
	},
	componentWillUnmount:function()
	{
		MainMenuStore.removeChangeListener(this._onChangeMM);
		UserInfoStore.removeChangeListener(this._onChangeUI);
		AppStateStore.removeChangeListener(this._onMove);
	},
	render:function()
	{
		return  <div className="navbar-fixed"><nav>
					<div className="nav-wrapper">
						<a href="#" data-activates="menu-mobile-data" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
						<ul className="left hide-on-med-and-down">
							<MenuNavItem className="mdi-hardware-keyboard-arrow-left" onClick={menuItemClick} id="menu-goLeft" data-enabled={this.state.hasLeft}></MenuNavItem>
							<MenuNavItem className="mdi-hardware-keyboard-arrow-right" onClick={menuItemClick} id="menu-goRight" data-enabled={this.state.hasRight}></MenuNavItem>
							{
								this.state.menuItems.map(function(menuItem, activeCommand)
									{
								    return <MenuItem key={menuItem.dataId} data={menuItem} onClick={menuItemClick} id={menuItem.dataId} data-active-item={this.state.activeCommand}></MenuItem>;
									}.bind(this))
							}
						</ul>
						<ul className="right hide-on-med-and-down">
							<Informer></Informer>
							<MenuUserInfo key={this.state.userInfo.dataId} shortName={this.state.userInfo.shortName}  onClick={menuItemClick} id={this.state.userInfo.dataId} data-active-item={this.state.activeCommand}></MenuUserInfo>
						</ul>
						<ul className="side-nav" id="menu-mobile-data">
							<div className="row">
								<div className="col"><MenuNavItem className="mdi-hardware-keyboard-arrow-left" onClick={menuItemClick} id="menu-goLeft" data-enabled={this.state.hasLeft}></MenuNavItem></div>
								<div className="col"><MenuNavItem className="mdi-hardware-keyboard-arrow-right" onClick={menuItemClick} id="menu-goRight" data-enabled={this.state.hasRight}></MenuNavItem></div>
							</div>
							{
								this.state.menuItems.map(function(menuItem, activeCommand)
									{
										return <MenuItem key={menuItem.dataId} data={menuItem} onClick={menuItemClick} id={menuItem.dataId} data-active-item={this.state.activeCommand}></MenuItem>;
									}.bind(this))
							}
							<li className="divider"></li>
							<Informer></Informer>
							<MenuUserInfo key={this.state.userInfo.dataId} shortName={this.state.userInfo.shortName} onClick={menuItemClick} id={this.state.userInfo.dataId} data-active-item={this.state.activeCommand}></MenuUserInfo>
						</ul>
					</div>
				</nav></div>
				;
	},
	_onChangeMM:function()
	{
		let command=AppStateStore.getCurrent();
		this.setState({menuItems:MainMenuStore.get()});
	},
	_onChangeUI:function()
	{
		let command=AppStateStore.getCurrent();
		this.setState({userInfo:UserInfoStore.get()});
	},
	_onMove:function()
	{
		let command=AppStateStore.getCurrent();
		if (!command)
		{
		    command={command:"", activeItemName:""};
		}
		this.setState({
			hasRight:AppStateStore.hasRight(),
			hasLeft:AppStateStore.hasLeft(),
			activeCommand:command.activeItemName
		});
	}
});

function getStateFromStores()
{
	return {
		menuItems:MainMenuStore.get(),
		userInfo:UserInfoStore.get(),
		hasRight:AppStateStore.hasRight(),
		hasLeft:AppStateStore.hasLeft(),
		activeCommand:""
	};
}

function menuItemClick(event)
{
	event.preventDefault();
	let sender=event.target;
	switch (event.target.id)
	{
		case "menu-goLeft":
		    AppStateGoLeftActionCreator.goLeft();
		    break;
		case "menu-goRight":
		    AppStateGoRightActionCreator.goRight();
			break;
		default:
		    AppStateAddActionCreator.add(sender.id, sender.id, null);
			break;
	}
}

export default MainMenu;