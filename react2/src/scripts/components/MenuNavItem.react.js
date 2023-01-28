"use strict";

const MenuNavItem = (props) => {
    let enabled = props["data-enabled"];
    let className = enabled ? "" : "disabled";
    let onClick = enabled ? props.onClick : null;
    return <li className={className}><i className={props.className} onClick={onClick} id={props.id}></i></li>;
};

export default MenuNavItem;