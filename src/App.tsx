import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {UsersContainer} from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from 'redux';
import {initialize, StateAppObjectType} from "./redux/appReducer";
import {Preloader} from "./components/common/Preloader/Preloader";
import withSuspense from "./hoc/withSuspens";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

type AppPropsType = {
    initialized: boolean
    initialize: () => void
}

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initialize()
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
                        <Route path={'/profile/:userId?'} render={withSuspense(ProfileContainer)}/>
                        <Route path={'/dialogs/'} render={withSuspense(DialogsContainer)}/>
                        <Route path={'/users/'} render={() => <UsersContainer/>}/>
                        <Route path={'/news/'} render={() => <News/>}/>
                        <Route path={'/music/'} render={() => <Music/>}/>
                        <Route path={'/settings/'} render={() => <Settings/>}/>
                        <Route path={'/login/'} render={() => <Login/>}/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

type mapStateToProps = {
    initialized: boolean
}

const mapStateToProps = (state: StateAppObjectType): mapStateToProps => ({
    initialized: state.app.initialized,
})

const mapDispatchToProps = {
    initialize,
}

export default compose<React.FC>(connect(mapStateToProps, mapDispatchToProps))(App)
