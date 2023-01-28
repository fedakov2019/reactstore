"use strict";

import React from "react";

import DatePicker from "../../core/DatePicker.react";
import DropDownList from "../../core/DropDownList.react";

class DCaseL1Hmp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.defaultValue };
    }

    componentDidUpdate() {
        this.props.onEdit(this.props, this.state);
    }


    render() {
        return <div className="input-field col s11">
            <div className="row">
                <div className="col s2">Вид ВМП</div>
                <div className="col s10">
                    <input type="text" id="vidHmp" value={this.state.value.vidHmp}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { vidHmp: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Метод ВМП</div>
                <div className="col s10">
                    <input type="text" id="methodHmp" value={this.state.value.methodHmp}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { methodHmp: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
                   <div className="row">
                       <div className="col s3">Дата выдачи талона на ВМП</div>
                       <div className="col s9">
                    <DatePicker id="talD" defaultValue={this.state.value.talD} caption="" allowEmpty={true}
                                       onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { talD: value }) });
                            }}
                           ></DatePicker>
                       </div>
                   </div>
        </div>;
    }
}

export default DCaseL1Hmp;