import React, { useCallback, useState } from 'react'
import { NavbarLeft } from '../components/NavbarLeft'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { News } from '../pages/News'
import { Music } from '../pages/Music'
import { Settings } from '../pages/Settings'
import { SideBarRight } from '../components/SideBarRight'
import { Login } from '../pages/Login'
import { Preloader } from '../components/Preloader'
import { withSuspense } from '../components/HOC/withSuspense'
import { Users } from '../pages/Users'
import { useAppInitialize } from './useAppInitialize'
import '../common/assets/css/app.css'

const ProfileContainer = React.lazy(() => import('../pages/Profile'))
const DialogsContainer = React.lazy(() => import('../pages/Dialogs'))

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)

export const App: React.FC = React.memo(() => {
  const [leftSide, setLeftSide] = useState(false)
  const [rightSide, setRightSide] = useState(false)
  const [overlay, setOverlaySide] = useState(false)
  const initialized = useAppInitialize()

  const handleClickLeftSide = useCallback((value: boolean) => {
    setLeftSide(value)
    setOverlaySide(value)
  }, [])

  const handleClickRightSide = () => {
    setRightSide(!rightSide)
    setOverlaySide(!rightSide)
  }

  const handleClickOverlay = () => {
    setOverlaySide(false)
    setLeftSide(false)
    setRightSide(false)
  }

  if (!initialized) return <Preloader />

  return (
    //HashRouter for gh-pages only
    <HashRouter>
      <div className='container'>
        <NavbarLeft leftSide={leftSide} onClickLeftSide={handleClickLeftSide} />
        <div className='main'>
          <div className='search-bar'>
            <input type='text' placeholder='Search' />
            <button
              className='right-side-button'
              onClick={handleClickRightSide}
            >
              <svg
                viewBox='0 0 24 24'
                width='24'
                height='24'
                stroke='currentColor'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='css-i6dzq1'
              >
                <path
                  d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1
                  2-2h14a2 2 0 0 1 2 2z'
                />
              </svg>
            </button>
          </div>
          <div className='main-container'>
            <Switch>
              <Route
                exact
                path={'/'}
                render={() => <Redirect to={'/profile/'} />}
              />
              <Route
                path={'/profile/:userId?'}
                render={() => <SuspendedProfile />}
              />
              <Route path={'/dialogs/'} render={() => <SuspendedDialogs />} />
              <Route path={'/users/'} render={() => <Users />} />
              <Route path={'/news/'} render={() => <News />} />
              <Route path={'/music/'} render={() => <Music />} />
              <Route path={'/settings/'} render={() => <Settings />} />
              <Route path={'/login/'} render={() => <Login />} />
              <Route path={'*'} render={() => <div>404 PAGE NOT FOUND</div>} />
            </Switch>
          </div>
        </div>
        <SideBarRight rightSide={rightSide} />
        <div
          className={overlay ? 'overlay active' : 'overlay'}
          onClick={handleClickOverlay}
        />
      </div>
    </HashRouter>
  )
})
