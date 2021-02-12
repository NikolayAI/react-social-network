import React from 'react'
import userPhoto from '../../../common/images/avatar-user-computer.jpg'
import { NavLink } from 'react-router-dom'
import { ResponseUserType } from '../../../api/api'

type UserPropsType = {
  user: ResponseUserType
  followingInProgress: number[]
  onFollow: (userId: number) => void
  onUnfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = React.memo(
  ({ user, followingInProgress, onFollow, onUnfollow }) => (
    <div className='user'>
      <NavLink to={`/profile/${user.id}`}>
        <img
          className='user-img'
          src={user.photos.small != null ? user.photos.small : userPhoto}
          alt={'avatar'}
        />
      </NavLink>
      <div className='username'>
        <div>{user.name}</div>
        <div className='user-status user-status-search'>{user.status}</div>
        <div>
          {user.followed ? (
            <button
              className='status-share status-share-follow-button'
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                onUnfollow(user.id)
              }}
            >
              unfollow
            </button>
          ) : (
            <button
              className='status-share status-share-follow-button'
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                onFollow(user.id)
              }}
            >
              follow
            </button>
          )}
        </div>
      </div>
    </div>
  )
)
