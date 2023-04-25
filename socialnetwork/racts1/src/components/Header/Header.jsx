import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import headphoto from './free-logo-maker.jpg'

const Header = (props) => {
    return <header className={s.header}>
        <img src={headphoto} />
    <div className={s.loginBlock}>
    {props.isAuth ? <div>{props.login}-<button onClick={props.Logout}>Log out</button> </div>:
        <NavLink to={'/login'}>Login</NavLink>}
    </div>
    </header>
}

export default Header;