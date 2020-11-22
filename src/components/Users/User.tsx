import React from "react"
import userPhoto
    from "../../assets/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg"
import {NavLink} from "react-router-dom"
import {ResponseUserType} from "../../types/types"


type UserPropsType = {
    user: ResponseUserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}


const User: React.FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => (
    <div>
        <span>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img style={{width: '3vw', borderRadius: '25px'}}
                         src={user.photos.small != null ? user.photos.small : userPhoto}/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}>unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id)
                    }}>follow</button>
                }
            </div>
        </span>
        <span>
            <span>
                <div>{user.name}</div><div>{user.status}</div>
            </span>
            <span>
                <div>{'user.location.country'}</div>
                <div>{'user.location.city'}</div>
            </span>
        </span>
    </div>
)


export default User