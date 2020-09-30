import {
    AddPostDispatchType,
    DispatchActionsType, ResponseProfilePageType,
    SetUserProfileDispatchType,
    StateProfilePageType,
    UpdatePostDispatchType
} from "./store";

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

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


export const profilePageReducer = (state: StateProfilePageType = initialState, action: DispatchActionsType) => {
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

export const addPostActionCreator = (): AddPostDispatchType => ({type: ADD_POST})
export const updatePostActionCreator = (text: string): UpdatePostDispatchType => {
    return {type: UPDATE_NEW_POST_TEXT, text: text}
}
export const setUserProfileAC = (profile: ResponseProfilePageType): SetUserProfileDispatchType => {
    return {type: SET_USER_PROFILE, profile}
}