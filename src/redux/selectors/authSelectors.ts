import { RootStateType } from '../reducers/rootReducer1'

export const getAuthorizedUserId = (state: RootStateType) => state.auth.userId
export const getIsAuth = (state: RootStateType) => state.auth.isAuth
export const getCaptchaUrl = (state: RootStateType) => state.auth.captchaUrl
export const getLogin = (state: RootStateType) => state.auth.login
