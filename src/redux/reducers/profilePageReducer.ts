import { FormAction, stopSubmit } from 'redux-form'
import { profileAPI } from '../../api/profileApi'
import {
    ResponseContactsType,
    ResponsePhotosType,
    ResponseProfileType,
} from '../../api/api'
import { ProfileDataFormFormDataType } from '../../pages/Profile/ProfileInfo/ProfileDataForm'
import { Dispatch } from 'redux'
import { BaseThunkType, InferActionsTypes, RootStateType } from './rootReducer'

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 23 },
        { id: 3, message: 'Blabla', likesCount: 5 },
        { id: 4, message: 'Dada', likesCount: 7 },
    ] as Array<StateProfilePagePostsItemType>,
    profile: {
        fullName: null,
        lookingForAJob: null,
        lookingForAJobDescription: null,
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null,
        } as ResponseContactsType,
        userId: null,
        photos: {
            small: undefined,
            large: undefined,
        } as ResponsePhotosType,
    } as ResponseProfileType,
    status: '',
}

export const profilePageReducer = (
    state = initialState,
    action: ActionsProfilePageType
) => {
    switch (action.type) {
        case 's_n/profile/ADD_POST':
            return {
                ...state,
                posts: [
                    ...state.posts,
                    { id: 10, message: action.payload, likesCount: 0 },
                ],
            }
        case 's_n/profile/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.payload),
            }
        case 's_n/profile/SET_USER_PROFILE':
        case 's_n/profile/SET_USER_STATUS':
            return { ...state, ...action.payload }
        case 's_n/profile/SET_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile, ...action.payload },
            }
        default:
            return state
    }
}

export const profileActions = {
    addPostAC: (message: string) =>
        ({ type: 's_n/profile/ADD_POST', payload: message } as const),
    deletePostAC: (postId: number) =>
        ({ type: 's_n/profile/DELETE_POST', payload: postId } as const),
    setUserProfileAC: (profile: ResponseProfileType) =>
        ({ type: 's_n/profile/SET_USER_PROFILE', payload: { profile } } as const),
    setUserStatusProfileAC: (status: string) =>
        ({ type: 's_n/profile/SET_USER_STATUS', payload: { status } } as const),
    savePhotoSuccessAC: (photos: ResponsePhotosType) =>
        ({ type: 's_n/profile/SET_PHOTO_SUCCESS', payload: photos } as const),
}

export const getUserStatus = (userId: number | null): ProfileThunkType => async (
    dispatch
) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setUserStatusProfileAC(data))
}

export const updateUserStatus = (status: string): ProfileThunkType => async (
    dispatch
) => {
    const data = await profileAPI.updateStatus(status)
    if (!data.resultCode) dispatch(profileActions.setUserStatusProfileAC(status))
}

export const getUserProfile = (userId: number | null): ProfileThunkType => async (
    dispatch
) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfileAC(data))
}

export const savePhoto = (file: File): ProfileThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (!data.resultCode) dispatch(profileActions.savePhotoSuccessAC(data.data.photos))
}

export const saveProfile = (profile: ProfileDataFormFormDataType) => async (
    dispatch: Dispatch<any>,
    getState: () => RootStateType
) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (!data.resultCode) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        let wrongNetwork = data.messages[0]
            .slice(data.messages[0].indexOf('>') + 1, data.messages[0].indexOf(')'))
            .toLocaleLowerCase()
        dispatch(stopSubmit('editProfile', { _error: wrongNetwork }))
        return Promise.reject(data.messages[0])
        // dispatch(stopSubmit('editProfile', {'contacts': {'facebook': response.data.messages[0]}}))
    }
}

export type StateProfilePagePostsItemType = {
    id: number
    message: string
    likesCount: number
}
export type StateProfilePageType = typeof initialState
export type ActionsProfilePageType = InferActionsTypes<typeof profileActions>
type ProfileThunkType = BaseThunkType<ActionsProfilePageType | FormAction>
