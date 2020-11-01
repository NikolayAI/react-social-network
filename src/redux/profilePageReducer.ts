import {FormAction, stopSubmit} from "redux-form";
import {ResponsePhotosType, ResponseProfileType} from "../types/types";
import {profileAPI} from "../api/profileApi";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Blabla', likesCount: 5},
        {id: 4, message: 'Dada', likesCount: 7},
    ] as Array<StateProfilePagePostsItemType>,
    profile: null as ResponseProfileType | null,
    status: '',
}


export const profilePageReducer = (state = initialState, action: ActionsProfilePageType) => {
    switch (action.type) {
        case 's_n/profile/ADD_POST':
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.text, likesCount: 0}]
            }
        case 's_n/profile/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case 's_n/profile/SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case 's_n/profile/SET_USER_STATUS':
            return {...state, status: action.status}
        case 's_n/profile/SET_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
};


export const profileActions = {
    addPostAC: (text: string) => ({type: 's_n/profile/ADD_POST', text} as const),
    deletePostAC: (postId: number) => ({type: 's_n/profile/DELETE_POST', postId} as const),
    setUserProfileAC: (profile: ResponseProfileType) => ({type: 's_n/profile/SET_USER_PROFILE', profile} as const),
    setUserStatusProfileAC: (status: string) => ({type: 's_n/profile/SET_USER_STATUS', status} as const),
    savePhotoSuccessAC: (photos: ResponsePhotosType) => ({type: 's_n/profile/SET_PHOTO_SUCCESS', photos} as const),
}


export const getUserStatus = (userId: number | null): ProfileThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setUserStatusProfileAC(data))
}
export const updateUserStatus = (status: string): ProfileThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (!data.resultCode) dispatch(profileActions.setUserStatusProfileAC(status))
}
export const getUserProfile = (userId: number | null): ProfileThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfileAC(data))
}
export const savePhoto = (file: File): ProfileThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (!data.resultCode) dispatch(profileActions.savePhotoSuccessAC(data.data.photos))
}
export const saveProfile = (profile: ResponseProfileType): ProfileThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (!data.resultCode) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        let wrongNetwork = data.messages[0].slice(
                data.messages[0].indexOf(">") + 1,
                data.messages[0].indexOf(")")
            ).toLocaleLowerCase();
        dispatch(stopSubmit('editProfile', {_error: wrongNetwork}))
        return Promise.reject(data.messages[0])
        // dispatch(stopSubmit('editProfile', {'contacts': {'facebook': response.data.messages[0]}}))
    }
}


export type StateProfileObjectPageType = {
    profilePage: StateProfilePageType
}
export type StateProfilePagePostsItemType = {
    id: number
    message: string
    likesCount: number
}
export type StateProfilePageType = typeof initialState
export type ActionsProfilePageType = InferActionsTypes<typeof profileActions>
type ProfileThunkType = BaseThunkType<ActionsProfilePageType | FormAction>