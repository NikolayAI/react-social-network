import React from 'react'
import { ProfileInfo } from './ProfileInfo'
import { MyPosts } from './MyPosts'
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

  const tabs = [
    { link: 'timeline', title: 'Timeline' },
    { link: 'about', title: 'About' },
    { link: 'friends', title: 'Friends' },
    { link: 'dialogs', title: 'Dialogs' },
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
              onClick={() => onClickActiveTab(i)}
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
        <ProfileInfo profile={profile} />
      </Route>
      <Route path='/profile/friends'>
        <div>friends</div>
      </Route>
      <Route path='/profile/dialogs'>
        <MyPosts />
      </Route>
      <Route path='/profile/more'>
        <div>more</div>
      </Route>
    </>
  )
}

export default Profile
