import React from 'react'
import style from './index.module.css'
import { Navbar } from '../components/Navbar'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { News } from '../pages/News'
import { Music } from '../pages/Music'
import { Settings } from '../pages/Settings'
import { Header } from '../components/Header'
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
  const initialized = useAppInitialize()

  if (!initialized) return <Preloader />

  return (
    //HashRouter for gh-pages only
    <HashRouter>
      <div className='container' x-data='{ rightSide: false, leftSide: false }'>
        <Header />
        <Navbar />
        <div className={style.appWrapperContent}>
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
    </HashRouter>
  )
})
