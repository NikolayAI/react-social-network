import {ThunkDispatch} from "redux-thunk";
import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ResponseProfileType} from "../types/types";

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

export type StateProfilePagePostsItemType = {
    id: number
    message: string
    likesCount: number
}
export type StateProfileObjectPageType = {
    profilePage: StateProfilePageType
}
export type StateProfilePageType = typeof initialState

export const profilePageReducer = (state = initialState, action: ActionsProfilePageType) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.text, likesCount: 0}]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_USER_STATUS:
            return {...state, status: action.status}
        case SET_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
};

const ADD_POST = 'social_network/profile/ADD_POST'
const DELETE_POST = 'social_network/profile/DELETE_POST'
const SET_USER_PROFILE = 'social_network/profile/SET_USER_PROFILE'
const SET_USER_STATUS = 'social_network/profile/SET_USER_STATUS'
const SET_PHOTO_SUCCESS = 'social_network/profile/SET_PHOTO_SUCCESS'

export type AddPostProfilePageActionType = {
    type: typeof ADD_POST
    text: string
}
export type DeletePostProfilePageActionType = {
    type: typeof DELETE_POST
    postId: number
}
export type SetUserProfilePageActionType = {
    type: typeof SET_USER_PROFILE
    profile: ResponseProfileType | null
}
export type SetUserStatusProfilePageActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
export type SetUserPhotoProfilePageActionType = {
    type: typeof SET_PHOTO_SUCCESS
    photos?: string
}

export type ActionsProfilePageType = AddPostProfilePageActionType
    | SetUserProfilePageActionType
    | SetUserStatusProfilePageActionType
    | DeletePostProfilePageActionType
    | SetUserPhotoProfilePageActionType

export const addPostAC = (text: string): AddPostProfilePageActionType => ({type: ADD_POST, text})
export const deletePostAC = (postId: number): DeletePostProfilePageActionType => ({type: DELETE_POST, postId})
export const setUserProfileAC = (profile: ResponseProfileType): SetUserProfilePageActionType => {
    return {type: SET_USER_PROFILE, profile}
}
export const setUserStatusProfileAC = (status: string): SetUserStatusProfilePageActionType => {
    return {type: SET_USER_STATUS, status}
}
export const savePhotoSuccessAC = (photos: string): SetUserPhotoProfilePageActionType => {
    return {type: SET_PHOTO_SUCCESS, photos}
}

export const getUserStatus = (userId: number | null) => async (dispatch: ThunkDispatch<StateProfilePageType, {}, ActionsProfilePageType>) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setUserStatusProfileAC(response.data))
}

export const updateUserStatus = (status: string) => async (dispatch: ThunkDispatch<StateProfilePageType, {}, ActionsProfilePageType>) => {
    const response = await profileAPI.updateStatus(status)
    if (!response.data.resultCode) dispatch(setUserStatusProfileAC(status))
}

export const getUserProfile = (userId: number | null) => async (dispatch: ThunkDispatch<StateProfilePageType, {}, ActionsProfilePageType>) => {
    const response = await usersAPI.getProfile(userId)
    if (!response.data.resultCode) dispatch(setUserProfileAC(response.data))
}

export const savePhoto = (file: File) => async (dispatch: ThunkDispatch<StateProfilePageType, {}, ActionsProfilePageType>) => {
    const response = await profileAPI.savePhoto(file)
    if (!response.data.resultCode) dispatch(savePhotoSuccessAC(response.data.data.photos))
}

export const saveProfile = (profile: any) => async (dispatch: ThunkDispatch<StateProfilePageType, {}, ActionsProfilePageType>, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        let wrongNetwork = response.data.messages[0].slice(
                response.data.messages[0].indexOf(">") + 1,
                response.data.messages[0].indexOf(")")
            ).toLocaleLowerCase();
        dispatch(stopSubmit('editProfile', {_error: wrongNetwork}))
        return Promise.reject(response.data.messages[0])
        // dispatch(stopSubmit('editProfile', {'contacts': {'facebook': response.data.messages[0]}}))
    }
}

// export type StateProfilePageType = {
//     posts: StateProfilePagePostsItemType[]
//     profile: ResponseProfilePageType | null
//     status: string
// }