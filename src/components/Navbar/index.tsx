import React from 'react'
import s from './index.module.css'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => (
    <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to={'/profile'} activeClassName={s.activeLink}>
                Profile
            </NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/dialogs'} activeClassName={s.activeLink}>
                Dialogs
            </NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/users'} activeClassName={s.activeLink}>
                Users
            </NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/news'} activeClassName={s.activeLink}>
                News
            </NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/music'} activeClassName={s.activeLink}>
                Music
            </NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/settings'} activeClassName={s.activeLink}>
                Settings
            </NavLink>
        </div>
    </nav>
)
