import {combineReducers, createStore} from 'redux'
import {profilePageReducer} from "./ProfilePageReducer";
import {dialogsPageReducer} from "./DialogsPageReducer";

const reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
})

export let store = createStore(reducers)
//@ts-ignore
window.store = store