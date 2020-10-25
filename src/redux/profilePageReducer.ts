import {ThunkDispatch} from "redux-thunk";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'

export type AddPostProfilePageACType = {
    type: 'ADD_POST'
    text: string
}

export type DeletePostProfilePageACType = {
    type: 'DELETE_POST'
    postId: number
}

export type SetUserProfilePageACType = {
    type: 'SET_USER_PROFILE'
    profile: ResponseProfilePageType | null
}

export type SetUserStatusProfilePageACType = {
    type: 'SET_USER_STATUS'
    status: string
}

export type SetUserPhotoProfilePageACType = {
    type: 'SET_PHOTO_SUCCESS'
    photos: string
}

export type ActionsProfilePageType = AddPostProfilePageACType
    | SetUserProfilePageACType
    | SetUserStatusProfilePageACType
    | DeletePostProfilePageACType
    | SetUserPhotoProfilePageACType


export type StateProfilePagePostsItemType = {
    id: number
    message: string
    likesCount: number
}

type ResponseProfilePageContactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

type ResponseProfilePagePhotosType = {
    small: string | undefined
    large: string | undefined
}

export type ResponseProfilePageType = {
    aboutMe: string | null
    contacts: ResponseProfilePageContactsType
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number | null
    photos: ResponseProfilePagePhotosType
}

export type StateProfileObjectPageType = {
    profilePage: StateProfilePageType
}

export type StateProfilePageType = {
    posts: StateProfilePagePostsItemType[]
    profile: ResponseProfilePageType | null
    status: string
}

const initialState: StateProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Blabla', likesCount: 5},
        {id: 4, message: 'Dada', likesCount: 7},
    ],
    profile: null,
    status: '',
}

export const profilePageReducer = (state: StateProfilePageType = initialState, action: ActionsProfilePageType) => {
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
        case "SET_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
};

export const addPostAC = (text: string): AddPostProfilePageACType => ({type: ADD_POST, text})
export const deletePostAC = (postId: number): DeletePostProfilePageACType => ({type: DELETE_POST, postId})
export const setUserProfileAC = (profile: ResponseProfilePageType): SetUserProfilePageACType => {
    return {type: SET_USER_PROFILE, profile}
}
export const setUserStatusProfileAC = (status: string): SetUserStatusProfilePageACType => {
    return {type: SET_USER_STATUS, status}
}
export const savePhotoSuccessAC = (photos: string): SetUserPhotoProfilePageACType => {
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