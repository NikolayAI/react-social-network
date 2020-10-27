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
    aboutMe: string | null
    contacts: ResponseContactsType
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
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