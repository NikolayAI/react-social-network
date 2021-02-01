import React from 'react'

import { NavLink } from 'react-router-dom'
import userPhoto from '../../common/images/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg'
import { logout } from '../../redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectLogin } from '../../redux/selectors/authSelectors'
import { selectSmallPhoto } from '../../redux/selectors/profileSelectors'

interface ISideBarRight {
  rightSide: boolean
}

export const SideBarRight: React.FC<ISideBarRight> = ({ rightSide }) => {
  const dispatch = useDispatch()
  const login = useSelector(selectLogin)
  const isAuth = useSelector(selectIsAuth)
  const smallPhoto = useSelector(selectSmallPhoto)

  const handleClickLogOut = () => dispatch(logout())

  return (
    <div className={rightSide ? 'right-side active' : 'right-side'}>
      <div className='account'>
        <button className='account-button'>
          <svg
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='css-i6dzq1'
            viewBox='0 0 24 24'
          >
            <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
            <path d='M22 6l-10 7L2 6' />
          </svg>
        </button>
        <button className='account-button'>
          <svg
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='css-i6dzq1'
            viewBox='0 0 24 24'
          >
            <path d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0' />
          </svg>
        </button>
        <span className='account-user'>
          {isAuth ? (
            <>
              {login}
              <img
                className='account-profile'
                src={smallPhoto != null ? smallPhoto : userPhoto}
                alt='profile photo'
              />
              <button className='status-share' onClick={handleClickLogOut}>
                Logout
              </button>
            </>
          ) : (
            <NavLink className='status-share' to={'/login'}>
              Login
            </NavLink>
          )}
        </span>
      </div>
      <div className='side-wrapper stories'>
        <div className='side-title'>STORIES</div>
        <div className='user'>
          <img
            src='https://pbs.twimg.com/profile_images/1102351320567164931/ZCkJgJIH.png'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Lisandro Matos
            <div className='album-date'>12 hours ago</div>
          </div>
        </div>
        <div className='user'>
          <img
            src='https://pbs.twimg.com/profile_images/1153966095444992000/1lpIyHaQ.jpg'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Gvozden Boskovsky
            <div className='album-date'>29 minutes ago</div>
          </div>
        </div>
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1565464027194-7957a2295fb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=3500&q=80'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Hnek Fortuin
            <div className='album-date'>3 hours ago</div>
          </div>
        </div>
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Lubomir Dvorak
            <div className='album-date'>18 hours ago</div>
          </div>
        </div>
      </div>
      <div className='side-wrapper contacts'>
        <div className='side-title'>CONTACTS</div>
        <div className='user'>
          <img
            src='https://randomuser.me/api/portraits/men/1.jpg'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Andrei Mashrin
            <div className='user-status' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=046c29138c1335ef8edee7daf521ba50'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Aryn Jacobssen
            <div className='user-status offline' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1575084713138-342cae5f8d00?ixlib=rb-1.2.1&auto=format&fit=crop&w=958&q=80'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Carole Landu
            <div className='user-status offline' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?h=350&auto=compress&cs=tinysrgb'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Chineze Afa
            <div className='user-status' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Mok Kwang
            <div className='user-status' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://randomuser.me/api/portraits/women/63.jpg'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Naomi Yepes
            <div className='user-status' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1476493279419-b785d41e38d8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=61eaea85f1aa3d065400179c78163f15'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Shaamikh Ale
            <div className='user-status' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://m.media-amazon.com/images/M/MV5BMjI4NDcyNjQxNl5BMl5BanBnXkFtZTgwMzI4OTM3NjM@._V1_UY256_CR13,0,172,256_AL_.jpg'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Sofia Alcocer
            <div className='user-status idle' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://images.unsplash.com/photo-1509380836717-c4320ccf1a6f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=e01c8c45a063daaf6d6e571a32bd6c90'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Wen Yahui
            <div className='user-status' />
          </div>
        </div>
        <div className='user'>
          <img
            src='https://pbs.twimg.com/profile_images/737221709267374081/sdwta9Oh.jpg'
            className='user-img'
            alt='user photo'
          />
          <div className='username'>
            Leslee Moss
            <div className='user-status idle' />
          </div>
        </div>
      </div>
      <div className='search-bar right-search'>
        <input type='text' placeholder='Search' />
        <div className='search-bar-svgs'>
          <svg
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='css-i6dzq1'
            viewBox='0 0 24 24'
          >
            <circle cx='12' cy='12' r='3' />
            <path d='M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' />
          </svg>
          <svg
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 469.34 469.34'
          >
            <path d='M456.84 76.17l-64-64.06c-16.13-16.13-44.18-16.17-60.37.04L45.77 301.67a10.73 10.73 0 00-2.7 4.59L.41 455.73a10.68 10.68 0 0013.19 13.2l149.33-42.7c1.73-.5 3.3-1.42 4.58-2.7l289.33-286.98c8.06-8.07 12.5-18.78 12.5-30.19s-4.44-22.12-12.5-30.2zM285.99 89.74L325.25 129l-205 205-14.7-29.44a10.67 10.67 0 00-9.55-5.9H78.92L286 89.75zM26.2 443.14l13.9-48.64 34.74 34.74-48.64 13.9zm123.14-35.18L98.3 422.54l-51.5-51.5L61.38 320H89.4l18.38 36.77a10.67 10.67 0 004.77 4.77l36.78 18.39v28.03zm21.33-17.54v-17.09c0-4.04-2.28-7.72-5.9-9.54l-29.43-14.7 205-205 39.26 39.26-208.93 207.07zm271.11-268.7l-47.03 46.61L301 74.6l46.59-47c8.06-8.07 22.1-8.07 30.16 0l64 64c4.03 4.03 6.25 9.38 6.25 15.08s-2.22 11.05-6.22 15.05z' />
          </svg>
          <svg
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            viewBox='0 0 24 24'
          >
            <path d='M12 5v14M5 12h14' />
          </svg>
        </div>
      </div>
    </div>
  )
}
