"use strict";

const ButtonGo = (props) => {
    return <a {...props} className="waves-effect waves-light btn"><i className="material-icons right"></i>{props.children ? props.children : "Отправить"}</a>;
};

export default ButtonGo;