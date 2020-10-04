import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

type HeadersPropsType = {
    isAuth: boolean
    login: string | null
}

function Header(props: HeadersPropsType) {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png"
                alt=""/>
            <div className={s.loginBlock}>

                {props.isAuth ? props.login : <NavLink to={'/login/'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header