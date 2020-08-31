import React from "react";
import s from './Header.module.css'

function Header() {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png"
                alt=""/>
        </header>
    )
}

export default Header