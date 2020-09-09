import {
    AddPostDispatchType,
    DispatchActionsType,
    StateProfilePagePostsItemType,
    StateProfilePageType,
    UpdatePostDispatchType
} from "./state";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export const profilePageReducer = (state: StateProfilePageType, action: DispatchActionsType) => {
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