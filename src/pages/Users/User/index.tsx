import React from 'react'
import userPhoto from '../../../common/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg'
import { NavLink } from 'react-router-dom'
import { ResponseUserType } from '../../../api/api'

type UserPropsType = {
    user: ResponseUserType
    followingInProgress: Array<number>
    onFollow: (userId: number) => void
    onUnfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = React.memo(
    ({ user, followingInProgress, onFollow, onUnfollow }) => (
        <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            style={{ width: '3vw', borderRadius: '25px' }}
                            src={
                                user.photos.small != null ? user.photos.small : userPhoto
                            }
                            alt={'avatar'}
                        />
                    </NavLink>
                </div>
                <div>
                    {user.followed ? (
                        <button
                            disabled={followingInProgress.some((id) => id === user.id)}
                            onClick={() => {
                                onUnfollow(user.id)
                            }}
                        >
                            unfollow
                        </button>
                    ) : (
                        <button
                            disabled={followingInProgress.some((id) => id === user.id)}
                            onClick={() => {
                                onFollow(user.id)
                            }}
                        >
                            follow
                        </button>
                    )}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
            </span>
        </div>
    )
)
