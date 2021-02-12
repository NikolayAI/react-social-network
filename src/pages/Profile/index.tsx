import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Redirect, Route } from 'react-router-dom'

import { ProfileInfo } from './ProfileInfo'
import { MyPosts } from './MyPosts'
import { selectProfile } from '../../redux/selectors/profileSelectors'
import { SuspendedChat } from '../../app'
import { TimeLine } from '../../components/TimeLine'
import { useRefreshProfile } from './useRefreshProfile'
import userPhoto from '../../common/images/avatar-user-computer.jpg'

interface IProfileProps {
  activeTab: number
  onClickActiveTab: (index: number) => void
}

const Profile: React.FC<IProfileProps> = ({ activeTab, onClickActiveTab }) => {
  const profile = useSelector(selectProfile)
  const { userId = '', authorizedUserId } = useRefreshProfile()

  const tabs = [
    { link: 'timeline', title: 'Timeline' },
    { link: 'about', title: 'About' },
    { link: 'friends', title: 'Friends' },
    { link: 'dialogs', title: 'Dialogs' },
    { link: 'chat', title: 'Chat' },
  ]

  return (
    <>
      <div className='profile'>
        <div className='profile-avatar'>
          <img
            src={profile.photos.large || userPhoto}
            alt='profile avatar'
            className='profile-img'
          />
          <div className='profile-name'>{profile.fullName}</div>
        </div>
        <img
          src='https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
          alt=''
          className='profile-cover'
        />
        <div className='profile-menu'>
          {tabs.map((tab, i) => (
            <NavLink
              key={tab.link}
              to={`/profile/${userId}/${tab.link}`}
              className={
                activeTab === i
                  ? 'profile-menu-link active'
                  : 'profile-menu-link'
              }
              onClick={() => onClickActiveTab(i)}
            >
              {tab.title}
            </NavLink>
          ))}
        </div>
      </div>
      <Redirect
        to={`/profile${userId ? `/${userId}` : ''}/${tabs[activeTab].link}`}
      />
      <Route path={`/profile${userId ? `/${userId}` : ''}/timeline`}>
        <TimeLine />
      </Route>
      <Route path={`/profile/${userId}/about`}>
        <ProfileInfo
          profile={profile}
          isOwner={userId === undefined && authorizedUserId !== userId}
        />
      </Route>
      <Route path={`/profile/${userId}/friends`}>
        <div>friends</div>
      </Route>
      <Route path={`/profile/${userId}/dialogs`}>
        <MyPosts />
      </Route>
      <Route path={`/profile/${userId}/chat`}>
        <SuspendedChat />
      </Route>
    </>
  )
}

export default Profile
