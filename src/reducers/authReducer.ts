import { ResultCodeForCaptcha, ResultCodes } from '../api/api'
import { ThunkDispatch } from 'redux-thunk'
import { FormAction, stopSubmit } from 'redux-form'
import { authAPI } from '../api/authApi'
import { securityAPI } from '../api/securityApi'
import { BaseThunkType, InferActionsTypes } from './reduxStore'

const initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null, // if null, then captcha is not required
}

export const authReducer = (
    state = initialState,
    action: ActionsAuthTypes
): StateAuthType => {
    switch (action.type) {
        case 's_n/auth/SET_AUTH_USER_DATA':
        case 's_n/auth/SET_CAPTCHA_URL_SUCCESS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const authActions = {
    setAuthUserDataAC: (
        userId: number | null,
        login: string | null,
        email: string | null,
        isAuth: boolean
    ) =>
        ({
            type: 's_n/auth/SET_AUTH_USER_DATA',
            payload: { userId, login, email, isAuth },
        } as const),
    getCaptchaUrlSuccessAC: (captchaUrl: string) =>
        ({
            type: 's_n/auth/SET_CAPTCHA_URL_SUCCESS',
            payload: { captchaUrl },
        } as const),
}

export const getAuthUserData = (): AuthThunkType => async (dispatch) => {
    const data = await authAPI.me()
    if (data.resultCode === ResultCodes.Success) {
        const { id, login, email } = data.data
        dispatch(authActions.setAuthUserDataAC(id, login, email, true))
    }
}

export const getCaptchaUrl = (): AuthThunkType => async (
    dispatch: ThunkDispatch<StateAuthType, {}, ActionsAuthTypes>
) => {
    const data = await securityAPI.getCaptchaUrl()
    dispatch(authActions.getCaptchaUrlSuccessAC(data.url))
}

export const logout = (): AuthThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodes.Success) {
        dispatch(authActions.setAuthUserDataAC(null, null, null, false))
    }
}

export const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
): AuthThunkType => async (dispatch) => {
    const { resultCode, messages } = await authAPI.login(
        email,
        password,
        rememberMe,
        captcha
    )
    if (resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData())
    } else {
        if (resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = messages.length > 0 ? messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export type StateAuthObjectType = {
    auth: StateAuthType
}
export type StateAuthType = typeof initialState
type ActionsAuthTypes = InferActionsTypes<typeof authActions>
type AuthThunkType = BaseThunkType<ActionsAuthTypes | FormAction>
