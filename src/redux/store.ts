import {
    FollowDispatchType,
    SetCurrentPageType,
    SetTotalUsersCountType,
    SetUsersDispatchType,
    ToggleIsFetchingType,
    UnfollowDispatchType
} from "./UsersPageReducer";


export type StateProfilePagePostsItemType = {
    id: number
    message: string
    likesCount: number
}
export type StateDialogsPageMessagesItemType = {
    id: number
    message: string
}
export type StateDialogsPageDialogsItemType = {
    id: number
    name: string
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


export type StateProfilePageType = {
    posts: StateProfilePagePostsItemType[]
    newPostText: string
    profile: ResponseProfilePageType | null
}

export type StateProfileObjectPageType = {
    profilePage: StateProfilePageType
}

export type StateDialogsPageType = {
    messages: StateDialogsPageMessagesItemType[]
    dialogs: StateDialogsPageDialogsItemType[]
    newMessageText: string
}
export type StateObjectType = {
    profilePage: StateProfilePageType
    dialogsPage: StateDialogsPageType
}
// export type StoreType = {
//     _state: StateObjectType
//     _callSubscriber: () => void
//     getState: () => StateObjectType
//     subscribe: (observer: () => void) => void
//     dispatch: (action: DispatchActionsType) => void
// }
export type DispatchActionsType =
    AddPostDispatchType
    | AddMessageDispatchType
    | UpdatePostDispatchType
    | UpdateMessageDispatchType
    | FollowDispatchType
    | UnfollowDispatchType
    | SetUsersDispatchType
    | SetCurrentPageType
    | SetTotalUsersCountType
    | ToggleIsFetchingType
    | SetUserProfileDispatchType

export type AddPostDispatchType = {
    type: 'ADD_POST'
}

export type AddMessageDispatchType = {
    type: 'ADD_MESSAGE'
}

export type UpdatePostDispatchType = {
    type: 'UPDATE_NEW_POST_TEXT'
    text: string
}

export type UpdateMessageDispatchType = {
    type: 'UPDATE_NEW_MESSAGE_TEXT'
    text: string
}

export type SetUserProfileDispatchType = {
    type: 'SET_USER_PROFILE'
    profile: ResponseProfilePageType | null
}

// export let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: 'Hi, how are you?', likesCount: 12},
//                 {id: 2, message: 'It\'s my first post', likesCount: 23},
//                 {id: 3, message: 'Blabla', likesCount: 5},
//                 {id: 4, message: 'Dada', likesCount: 7},
//             ],
//             newPostText: '',
//             // @ts-ignore
//             profile: {}
//         },
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: 'Dimych'},
//                 {id: 2, name: 'Andrey'},
//                 {id: 3, name: 'Sveta'},
//                 {id: 4, name: 'Sasha'},
//                 {id: 5, name: 'Viktor'},
//                 {id: 6, name: 'Valera'}
//             ],
//             messages: [
//                 {id: 1, message: 'Hi'},
//                 {id: 2, message: 'How is your it-kamasutra'},
//                 {id: 3, message: 'Yo'},
//                 {id: 4, message: 'Yo'},
//                 {id: 5, message: 'Yo'}
//             ],
//             newMessageText: ''
//         }
//     },
//     _callSubscriber() {
//         console.log('state has been changed')
//     },
//
//     getState() {
//         return this._state
//     },
//     subscribe(observer: () => void) {
//         this._callSubscriber = observer
//     },
//
//     dispatch(action) {
//         // @ts-ignore
//
//         this._state.profilePage = profilePageReducer(this._state.profilePage, action)
//         this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action)
//
//         this._callSubscriber()
//     }
// }
//
// export default store