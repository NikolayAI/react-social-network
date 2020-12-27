import { RootStateType } from '../reducers/rootReducer1'

export const selectAuthorizedUserId = (state: RootStateType) => state.auth.userId
export const selectIsAuth = (state: RootStateType) => state.auth.isAuth
export const selectCaptchaUrl = (state: RootStateType) => state.auth.captchaUrl
export const selectLogin = (state: RootStateType) => state.auth.login
