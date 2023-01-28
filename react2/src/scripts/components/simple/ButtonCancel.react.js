"use strict";

const ButtonCancel = (props) => {
    return <a {...props} className="waves-effect waves-light btn">{props.children ? props.children : "Отмена"}</a>;
};

export default ButtonCancel;