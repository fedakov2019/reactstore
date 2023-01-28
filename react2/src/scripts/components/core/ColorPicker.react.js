"use strict";

import React from "react";

class ColorPicker extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            color: this.props.data.color
        }
    }

    componentWillReceiveProps(next)
	{
		this.setState({color:next.data.color});
    }

	render()
	{
		return 	<div className="row">
					<div className="col s12 m6">
						{this.props.data.caption}
					</div>
					<div className="col s6 m2">
						<input type="color" onChange={this._onChange.bind(this)} value={this.state.color} data-id={this.props.data.id}></input>
					</div>
				</div>;
	}

	_onChange(event)
	{
		this.setState({color:event.target.value});
		if (this.props.onChange)
		{
			this.props.onChange(event);
		}
	}
}

export default ColorPicker;