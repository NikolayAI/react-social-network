import {authAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'social_network/auth/SET_AUTH_USER_DATA'

export type SetAuthUserDataACType = {
    type: 'social_network/auth/SET_AUTH_USER_DATA'
    payload?: StateDataObjectType
}

export type StateAuthObjectType = {
    auth: StateAuthType
}

export type StateAuthType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}


type ActionsAuthTypes = SetAuthUserDataACType

export type StateDataObjectType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const initialState: StateAuthType = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
}

export const authReducer = (state: StateAuthType = initialState, action: ActionsAuthTypes): StateAuthType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state;
    }
};

export const setAuthUserDataAC = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataACType => {
    return {type: SET_AUTH_USER_DATA, payload: {userId, login, email, isAuth}}
}

export const getAuthUserData = () => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {id, login, email} = response.data.data
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}