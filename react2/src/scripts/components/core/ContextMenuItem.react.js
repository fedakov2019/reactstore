"use strict";

import React from "react";

import UserInfoStore from "../../stores/UserInfoStore";

class ContextMenuItem extends React.Component{
	render()
	{
		if (this.props.isVisible!=null)
		{
			if (typeof this.props.isVisible == "function")
			{
				let rslt=this.props.isVisible(this.props);
				if (!rslt)
				{
					return null;
				}
			}
			else
			{
				if (this.props.isVisible===false)
				{
					return null;
				}
			}
		}
		let pass=this.props.inRole==null;
		if (!pass)
		{
			let roles=Array.isArray(this.props.inRole)?this.props.inRole:[this.props.inRole];
			let avaliableRoles=UserInfoStore.get().roles;
			pass=roles.some(val=>{
				return avaliableRoles.indexOf(val)>=0;
			});
		}
		if (pass)
		{
		    return <a href="#" className="collection-item" onClick={(event) => { this.props.onClick(event, this.props); }}>{this.props.caption}</a>;
		}
		else
		{
			return null;
		}
	}
};


export default ContextMenuItem;