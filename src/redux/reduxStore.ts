import {combineReducers, createStore} from 'redux'
import {profilePageReducer} from "./ProfilePageReducer";
import {dialogsPageReducer} from "./DialogsPageReducer";
import {usersPageReducer} from "./UsersPageReducer";

const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer,
    //@ts-ignore
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//@ts-ignore
window.store = store