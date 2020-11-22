import React from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import {UsersPage} from "./components/Users/UsersPage"
import HeaderContainer from "./components/Header/HeaderContainer"
import {LoginPage} from "./components/Login/LoginPage"
import {connect} from "react-redux"
import {compose} from 'redux'
import {initialize, StateAppObjectType} from "./redux/appReducer"
import {Preloader} from "./components/common/Preloader/Preloader"
import withSuspense from "./hoc/withSuspens"


const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)

type MapStateToPropsType = {
    initialized: boolean
}

type MapDispatchToPropsType = {
    initialize: () => void
}


class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert('some error occurred')
        console.log(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initialize()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        return (
            //HashRouter for gh-pages only
            <HashRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className={'app-wrapper-content'}>
                        <Switch>
                            <Route exact path={'/'} render={() => <Redirect to={'/profile/'}/>}/>
                            <Route path={'/profile/:userId?'} render={() => <SuspendedProfile/>}/>
                            <Route path={'/dialogs/'} render={() => <SuspendedDialogs/>}/>
                            <Route path={'/users/'} render={() => <UsersPage/>}/>
                            <Route path={'/news/'} render={() => <News/>}/>
                            <Route path={'/music/'} render={() => <Music/>}/>
                            <Route path={'/settings/'} render={() => <Settings/>}/>
                            <Route path={'/login/'} render={() => <LoginPage/>}/>
                            <Route path={'*'} render={() => <div>404 PAGE NOT FOUND</div>}/>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        )
    }
}


const mapStateToProps = (state: StateAppObjectType): MapStateToPropsType => ({
    initialized: state.app.initialized,
})

const mapDispatchToProps = {
    initialize,
}


export default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps))(App)