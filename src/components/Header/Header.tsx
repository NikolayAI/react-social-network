import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import userPhoto
    from "../../assets/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg";

type HeadersPropsType = {
    isAuth: boolean
    login: string | null
    smallPhoto: string | undefined
    logout: () => void
}

function Header(props: HeadersPropsType) {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png"
                alt=""/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div><img style={{width: '3vw', borderRadius: '25px'}}
                                     src={props.smallPhoto != null ? props.smallPhoto : userPhoto}
                            />{props.login} - <button onClick={props.logout}>Logout</button>
                    </div>
                    : <NavLink to={'/login/'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header