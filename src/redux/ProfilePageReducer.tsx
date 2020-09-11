import {
    AddPostDispatchType,
    DispatchActionsType,
    StateProfilePagePostsItemType,
    StateProfilePageType,
    UpdatePostDispatchType
} from "./store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialState: StateProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Blabla', likesCount: 5},
        {id: 4, message: 'Dada', likesCount: 7},
    ],
    newPostText: '',
}

export const profilePageReducer = (state: StateProfilePageType = initialState, action: DispatchActionsType) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: StateProfilePagePostsItemType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.text
            return state
        default:
            return state
    }
}

export const addPostActionCreator = (): AddPostDispatchType => ({type: ADD_POST})
export const updatePostActionCreator = (text: string): UpdatePostDispatchType => {
    return {type: UPDATE_NEW_POST_TEXT, text: text}
}