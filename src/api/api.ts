import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': 'f42d8ba2-6f4b-4b16-a713-ca3fc2cb7707' },
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

export type ResponseContactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
export type ResponsePhotosType = {
    small: string | undefined
    large: string | undefined
}
export type ResponseProfileType = {
    fullName: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    aboutMe: string | null
    contacts: ResponseContactsType
    userId: number | null
    photos: ResponsePhotosType
}
export type ResponseUserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: ResponsePhotosType
    status: string | null
    followed: boolean
}
export type GetItemsType = {
    items: Array<ResponseUserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
