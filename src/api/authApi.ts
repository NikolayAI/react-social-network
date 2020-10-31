import {instance} from "./api";

export enum ResultCodes {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    },
}