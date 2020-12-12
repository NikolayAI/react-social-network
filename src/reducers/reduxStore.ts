import {
    Action,
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
} from 'redux'
import { profilePageReducer } from './profilePageReducer'
import { dialogsPageReducer } from './dialogsPageReducer'
import { usersPageReducer } from './usersPageReducer'
import { authReducer } from './authReducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer'

const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>
export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: Array<any>) => infer U
}
    ? U
    : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
    R,
    RootStateType,
    unknown,
    A
>

export let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunkMiddleware),
        //@ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
//@ts-ignore
window.__store__ = store
