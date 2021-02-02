import React from 'react'
import { ProfileInfo } from './ProfileInfo'
import { MyPosts } from './MyPosts'
import { useRefreshProfile } from './useRefreshProfile'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../redux/selectors/profileSelectors'
import userPhoto from '../../common/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg'
import { Preloader } from '../../components/Preloader'
import { NavLink, Route } from 'react-router-dom'
import { TimeLine } from '../../components/TimeLine'

const Profile: React.FC = () => {
  const profile = useSelector(selectProfile)
  const { userId, authorizedUserId } = useRefreshProfile()

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
          <NavLink to='/profile/timeline' className='profile-menu-link'>
            Timeline
          </NavLink>
          <NavLink to='/profile/about' className='profile-menu-link'>
            About
          </NavLink>
          <NavLink to='/profile/friends' className='profile-menu-link'>
            Friends
          </NavLink>
          <NavLink to='/profile/photos' className='profile-menu-link'>
            Photos
          </NavLink>
          <NavLink to='/profile/more' className='profile-menu-link'>
            More
          </NavLink>
        </div>
      </div>
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
