import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs, { DialogsObjectsType } from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { MyPostsType } from './components/Profile/MyPosts/MyPosts';

export type StateObjectType = {
    profilePage: MyPostsType
    dialogsPage: DialogsObjectsType
}

type AppType = {
    state: StateObjectType
}

function App(props: AppType) {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile'} render={() => <Profile state={props.state.profilePage}/>}/>
                    <Route path={'/dialogs'} render={() => <Dialogs state={props.state.dialogsPage}/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
