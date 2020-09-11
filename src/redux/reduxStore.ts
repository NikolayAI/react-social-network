import {createStore, combineReducers } from 'redux'
import {profilePageReducer} from "./ProfilePageReducer";
import {dialogsPageReducer} from "./DialogsPageReducer";
import {StoreType} from "./store";

const reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
})

export let store: StoreType = createStore(reducers)