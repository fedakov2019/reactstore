"use strict";

const MenuUserInfo = (props) => {
    let activeClass = "";
    let onClick = props.onClick;
    if (props["data-active-item"] == props.id) {
        activeClass = "active";
        onClick = null;
    }
    return <li className={activeClass}>
					<a href="#" onClick={onClick} id={props.id}>
						{props.shortName}
					</a>
				</li>;
};

export default MenuUserInfo;