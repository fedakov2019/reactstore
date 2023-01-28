"use strict";

import React from "react";

import ButtonOk from "../simple/ButtonOk.react";

class PlanAddPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idMedOrg:null,
            uslOk:1,
            moneyAll:0,
            moneyFed:0,
            volumeAll:0,
            volumeFed:0
        };
    }
    render(){ 
        return <div className="row">
        <div className="input-field col s1">
            <input id={this.props.id+"##mo"} type="text" pattern="[0-9]{6}" className="validate" value={this.state.idMedOrg} onChange={(event)=> { this.setState({idMedOrg:event.currentTarget.value}); }}></input>
            <label htmlFor={this.props.id+"##mo"}>Код МО</label>
        </div>
        <div className="input-field col s1">
            <input id={this.props.id+"##uslOk"} type="text" pattern="[1,2]{1}" className="validate" value={this.state.uslOk} onChange={(event)=> { this.setState({uslOk:event.currentTarget.value}); }}></input>
            <label className="active" htmlFor={this.props.id+"##uslOk"}>Условия МП</label>
        </div>
        <div className="input-field col s2">
            <input id={this.props.id+"##volAll"} type="text" pattern="[0-9]{1,10}(\.[0-9]{1,2}){0,1}" className="validate" value={this.state.volumeAll} onChange={(event)=> { this.setState({volumeAll:event.currentTarget.value}); }}></input>
            <label className="active" htmlFor={this.props.id+"##volAll"}>Объём (общ.)</label>
        </div>
        <div className="input-field col s2">
            <input id={this.props.id+"##volFed"} type="text" pattern="[0-9]{1,10}(\.[0-9]{1,2}){0,1}" className="validate" value={this.state.volumeFed} onChange={(event)=> { this.setState({volumeFed:event.currentTarget.value}); }}></input>
            <label className="active" htmlFor={this.props.id+"##volFed"}>Объём (фед.)</label>
        </div>
        <div className="input-field col s2">
            <input id={this.props.id+"##sumAll"} type="text" pattern="[0-9]{1,10}(\.[0-9]{1,2}){0,1}" className="validate" value={this.state.moneyAll} onChange={(event)=> { this.setState({moneyAll:event.currentTarget.value}); }}></input>
            <label className="active" htmlFor={this.props.id+"##sumAll"}>Сумма (общ.)</label>
        </div>
        <div className="input-field col s2">
            <input id={this.props.id+"##sumFed"} type="text" pattern="[0-9]{1,10}(\.[0-9]{1,2}){0,1}" className="validate" value={this.state.moneyFed} onChange={(event)=> { this.setState({moneyFed:event.currentTarget.value}); }}></input>
            <label className="active" htmlFor={this.props.id+"##sumFed"}>Сумма (фед.)</label>
        </div>
        <div className="col s2">
            <ButtonOk onClick={() => {
            if (this.props.onOkClick != null) {
                this.props.onOkClick(Object.assign({},this.props), Object.assign({}, this.state))   ;
                }
            this.setState({moneyAll:0,moneyFed:0,volumeAll:0,volumeFed:0});
        }}>Добавить</ButtonOk>
        </div>
        </div>;
    }
};

export default PlanAddPanel;