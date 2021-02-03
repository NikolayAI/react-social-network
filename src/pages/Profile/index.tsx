import React from 'react'
import { ProfileInfo } from './ProfileInfo'
import { MyPosts } from './MyPosts'
import { useRefreshProfile } from './useRefreshProfile'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../redux/selectors/profileSelectors'
import userPhoto from '../../common/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg'
import { NavLink, Redirect, Route } from 'react-router-dom'
import { TimeLine } from '../../components/TimeLine'

interface IProfileProps {
  activeTab: number
  onClickActiveTab: (index: number) => void
}

const Profile: React.FC<IProfileProps> = ({ activeTab, onClickActiveTab }) => {
  const profile = useSelector(selectProfile)
  const { userId, authorizedUserId } = useRefreshProfile()

  const handleClickProfileTab = (index: number) => {
    onClickActiveTab(index)
  }

  const tabs = [
    { link: 'timeline', title: 'Timeline' },
    { link: 'about', title: 'About' },
    { link: 'friends', title: 'Friends' },
    { link: 'photos', title: 'Photos' },
    { link: 'more', title: 'More' },
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
          <div className='profile-name'>NikolayAI</div>
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
              to={`/profile/${tab.link}`}
              className={
                activeTab === i
                  ? 'profile-menu-link active'
                  : 'profile-menu-link'
              }
              onClick={() => handleClickProfileTab(i)}
            >
              {tab.title}
            </NavLink>
          ))}
        </div>
      </div>
      <Redirect to={`/profile/${tabs[activeTab].link}`} />
      <Route path='/profile/timeline'>
        <TimeLine />
      </Route>
      <Route path='/profile/about'>
        <ProfileInfo
          profile={profile}
          isOwner={userId === undefined && authorizedUserId !== userId}
        />
      </Route>
      <Route path='/profile/friends'>
        <div>friends</div>
      </Route>
      <Route path='/profile/photos'>
        <div>photos</div>
      </Route>
      <Route path='/profile/more'>
        <div>more</div>
      </Route>
      <MyPosts />
    </>
  )
}

export default Profile
