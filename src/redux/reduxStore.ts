import {combineReducers, createStore} from 'redux'
import {profilePageReducer} from "./profilePageReducer";
import {dialogsPageReducer} from "./dialogsPageReducer";
import {usersPageReducer} from "./usersPageReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer,
    //@ts-ignore
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//@ts-ignore
window.store = store