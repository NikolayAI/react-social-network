import { Action, combineReducers } from 'redux'
import { profilePageReducer } from './profilePageReducer'
import { dialogsPageReducer } from './dialogsPageReducer'
import { usersPageReducer } from './usersPageReducer'
import { authReducer } from './authReducer'
import { appReducer } from './appReducer'
import { reducer as formReducer } from 'redux-form'
import { ThunkAction } from 'redux-thunk'

export const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: any[]) => infer U
}
    ? U
    : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
    R,
    RootStateType,
    unknown,
    A
>
