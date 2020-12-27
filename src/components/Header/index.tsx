import React from 'react'
import s from './index.module.css'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../common/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg'
import { logout } from '../../redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import { selectIsAuth, selectLogin } from '../../redux/selectors/authSelectors'
import { selectSmallPhoto } from '../../redux/selectors/profileSelectors'

export const Header: React.FC = () => {
    const login = useSelector(selectLogin)
    const isAuth = useSelector(selectIsAuth)
    const smallPhoto = useSelector(selectSmallPhoto)

    return (
        <header className={s.header}>
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png'
                alt=''
            />
            <div className={s.loginBlock}>
                {isAuth ? (
                    <div>
                        <img
                            style={{ width: '3vw', borderRadius: '25px' }}
                            src={smallPhoto != null ? smallPhoto : userPhoto}
                            alt={'avatar'}
                        />
                        {login} - <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <NavLink to={'/login/'}>Login</NavLink>
                )}
            </div>
        </header>
    )
}
