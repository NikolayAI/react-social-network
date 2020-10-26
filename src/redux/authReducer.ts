import {authAPI, securityAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'social_network/auth/SET_AUTH_USER_DATA'
const SET_CAPTCHA_URL_SUCCESS = 'social_network/auth/SET_CAPTCHA_URL_SUCCESS'

export type SetAuthUserDataACType = {
    type: 'social_network/auth/SET_AUTH_USER_DATA'
    payload?: StateDataObjectType
}

export type getCaptchaUrlSuccessACType = {
    type: 'social_network/auth/SET_CAPTCHA_URL_SUCCESS'
    payload: {captchaUrl: string}
}

export type StateAuthObjectType = {
    auth: StateAuthType
}

export type StateAuthType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}


type ActionsAuthTypes = SetAuthUserDataACType
    | getCaptchaUrlSuccessACType

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
    captchaUrl: null, // if null, then captcha is not required
}

export const authReducer = (state: StateAuthType = initialState, action: ActionsAuthTypes): StateAuthType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state;
    }
};

export const setAuthUserDataAC = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataACType => {
    return {type: SET_AUTH_USER_DATA, payload: {userId, login, email, isAuth}}
}

export const getCaptchaUrlSuccessAC = (captchaUrl: string): getCaptchaUrlSuccessACType => {
    return {type: SET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}}
}

export const getAuthUserData = () => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {id, login, email} = response.data.data
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if(response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
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

export const getCaptchaUrl = () => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const response = await securityAPI.getCaptchaUrl()
    const captcha = response.data.url
    dispatch(getCaptchaUrlSuccessAC(captcha))
}