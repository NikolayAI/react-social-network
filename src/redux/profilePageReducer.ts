const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

export type AddPostProfilePageACType = {
    type: 'ADD_POST'
}

export type UpdatePostProfilePageACType = {
    type: 'UPDATE_NEW_POST_TEXT'
    text: string
}

export type SetUserProfilePageACType = {
    type: 'SET_USER_PROFILE'
    profile: ResponseProfilePageType | null
}

export type ActionsProfilePageType = AddPostProfilePageACType
    | UpdatePostProfilePageACType
    | SetUserProfilePageACType


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
    newPostText: string
    profile: ResponseProfilePageType | null
}

const initialState: StateProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Blabla', likesCount: 5},
        {id: 4, message: 'Dada', likesCount: 7},
    ],
    newPostText: '',
    profile: null
}

export const profilePageReducer = (state: StateProfilePageType = initialState, action: ActionsProfilePageType) => {
    switch (action.type) {
        case ADD_POST:
            let text = state.newPostText;
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 5, message: text, likesCount: 0}]
            };
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.text}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state;
    }
};

export const addPostActionCreator = (): AddPostProfilePageACType => ({type: ADD_POST})
export const updatePostActionCreator = (text: string): UpdatePostProfilePageACType => {
    return {type: UPDATE_NEW_POST_TEXT, text: text}
}
export const setUserProfileAC = (profile: ResponseProfilePageType): SetUserProfilePageACType => {
    return {type: SET_USER_PROFILE, profile}
}