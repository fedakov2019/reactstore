"use strict";

import React from "react";

import UserInfoStore from "../stores/UserInfoStore";

class ReportingClickableItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.checkVisibility = this._checkVisibility.bind(this);
    }

    componentWillMount()
    {
        this._checkVisibility();
        UserInfoStore.addChangeListener(this.checkVisibility);
    }

    componentWillUnmount()
    {
        UserInfoStore.removeChangeListener(this.checkVisibility);
    }

    render()
    {
        if (this.state.isVisible)
        {
            return <a className="collection-item" onClick={(event) => {
                if (this.props.onClick == null) {
                    return;
                }
                this.props.onClick(event);}} >{this.props.children}</a>;
        }
		else
		{
			return null;
		}
	}

	_checkVisibility()
		{
		    if (this.props.inRole==null)
		    {
		        if (this.state.isVisible==false)
		        {
		            this.setState({
		                isVisible:true
		            });
		        }
		        return;
		    }
		    let roles=Array.isArray(this.props.inRole)?this.props.inRole:[this.props.inRole];
		    let data=UserInfoStore.get();
		    let pass=false;
		    if (data==null||data.roles==null)
		    {}
		    else
		    {
		        let avaliableRoles=data.roles;
		        pass=roles.some(val=>{
		            return avaliableRoles.indexOf(val)>=0;
		        });
		    }
		    this.setState({
		        isVisible:pass
		    });
		}
};

export default ReportingClickableItem;