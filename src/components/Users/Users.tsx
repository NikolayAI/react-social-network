import React from "react";
import style from './Users.module.css'
import {UsersPageObjectsType} from "../../redux/usersPageReducer";
import userPhoto
    from "../../assets/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    users: UsersPageObjectsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPageHandler: (page: number) => void
    followingInProgress: number[]
}

function Users(props: UsersPropsType) {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pagesArr = []
    for (let i = 1; i <= pagesCount; i++) pagesArr.push(i)

    return (
        <div>
            {pagesArr.map(p => <span className={props.currentPage === p ? style.currentPage : ''}
                                     onClick={() => props.setCurrentPageHandler(p)}>{p}</span>)}
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile'}>
                            <img style={{width: '3vw', borderRadius: '25px'}}
                                 src={u.photos.small != null ? u.photos.small : userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)
                            }}>unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id)
                            }}>follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)}
        </div>
    )
}

export default Users