import React, { useState } from 'react'
import style from './index.module.css'
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

// TODO: разобраться с x-data='{ rightSide: false, leftSide: false }'
// на корневом диве с классом 'container'
// TODO: разобраться с дивом с классом overlay:
//  @click="rightSide = false;
//  leftSide = false" :class="{ 'active': rightSide || leftSide }"

export const App: React.FC = React.memo(() => {
  const [leftSide, setLeftSide] = useState(false)
  const [rightSide, setRightSide] = useState(false)
  const [overlay, setOverlaySide] = useState(false)

  const initialized = useAppInitialize()

  if (!initialized) return <Preloader />

  const handleClickLeftSide = (value: boolean) => {
    setLeftSide(value)
    setOverlaySide(value)
  }

  const handleClickOverlay = () => {
    setOverlaySide(false)
    setLeftSide(false)
    setRightSide(false)
  }

  return (
    //HashRouter for gh-pages only
    <HashRouter>
      <div className='container'>
        <NavbarLeft leftSide={leftSide} onClickLeftSide={handleClickLeftSide} />
        <div className={style.appWrapperContent}>
          <Switch>
            <Route
              exact
              path={'/'}
              render={() => <Redirect to={'/profile/'} />}
            />
            <Route
              path={'/profile/:userId?'}
              render={() => (
                <SuspendedProfile
                  rightSide={rightSide}
                  onClickRightSide={setRightSide}
                />
              )}
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
        <SideBarRight />
        <div
          className={overlay ? 'overlay active' : 'overlay'}
          onClick={handleClickOverlay}
        />
      </div>
    </HashRouter>
  )
})
