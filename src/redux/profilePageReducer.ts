import {ThunkDispatch} from "redux-thunk";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'

export type AddPostProfilePageACType = {
    type: 'ADD_POST'
    text: string
}

export type SetUserProfilePageACType = {
    type: 'SET_USER_PROFILE'
    profile: ResponseProfilePageType | null
}

export type SetUserStatusProfilePageACType = {
    type: 'SET_USER_STATUS'
    status: string
}

export type ActionsProfilePageType = AddPostProfilePageACType
    | SetUserProfilePageACType
    | SetUserStatusProfilePageACType


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
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_USER_STATUS:
            return {...state, status: action.status}
        default:
            return state;
    }
};

export const addPostActionCreator = (text: string): AddPostProfilePageACType => ({type: ADD_POST, text})
export const setUserProfileAC = (profile: ResponseProfilePageType): SetUserProfilePageACType => {
    return {type: SET_USER_PROFILE, profile}
}
export const setUserStatusProfileAC = (status: string): SetUserStatusProfilePageACType => {
    return {type: SET_USER_STATUS, status}
}

export const getUserStatus = (userId: number | null) => (dispatch: ThunkDispatch<StateProfilePageType, {}, ActionsProfilePageType>) => {
    profileAPI.getStatus(userId)
        .then(response => dispatch(setUserStatusProfileAC(response.data)))
}

export const updateUserStatus = (status: string) => (dispatch: ThunkDispatch<StateProfilePageType, {}, ActionsProfilePageType>) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (!response.data.resultCode) dispatch(setUserStatusProfileAC(status))
        })
}

export const getUserProfile = (userId: number | null) => (dispatch: ThunkDispatch<StateProfilePageType, {}, ActionsProfilePageType>) => {
    usersAPI.getProfile(userId)
        .then(response => dispatch(setUserProfileAC(response.data)))
}