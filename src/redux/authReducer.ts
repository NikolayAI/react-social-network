import {authAPI, ResultCodeForCaptcha, ResultCodes, securityAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";

const initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null, // if null, then captcha is not required
}

export type StateAuthObjectType = {
    auth: StateAuthType
}
export type StateAuthType = typeof initialState

export const authReducer = (state = initialState, action: ActionsAuthTypes): StateAuthType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state;
    }
};

const SET_AUTH_USER_DATA = 'social_network/auth/SET_AUTH_USER_DATA'
const SET_CAPTCHA_URL_SUCCESS = 'social_network/auth/SET_CAPTCHA_URL_SUCCESS'

export type getCaptchaUrlSuccessActionType = {
    type: typeof SET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
export type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload?: SetAuthUserDataActionPayloadType
}
export type SetAuthUserDataActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

type ActionsAuthTypes = SetAuthUserDataActionType
    | getCaptchaUrlSuccessActionType

export const setAuthUserDataAC = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {type: SET_AUTH_USER_DATA, payload: {userId, login, email, isAuth}}
}

export const getCaptchaUrlSuccessAC = (captchaUrl: string): getCaptchaUrlSuccessActionType => {
    return {type: SET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}}
}

export const getAuthUserData = () => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const data = await authAPI.me()
    if (data.resultCode === ResultCodes.Success) {
        const {id, login, email} = data.data
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData())
    } else {
        if(data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodes.Success) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>) => {
    const response = await securityAPI.getCaptchaUrl()
    const captcha = response.data.url
    dispatch(getCaptchaUrlSuccessAC(captcha))
}

// export type StateAuthType = {
//     userId: number | null
//     login: string | null
//     email: string | null
//     isAuth: boolean
//     captchaUrl: string | null
// }