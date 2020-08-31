type StateProfilePagePostsItemType = {
    id: number
    message: string
    likesCount: number
}

type StateDialogsPageMessagesItemType = {
    id: number
    message: string
}

type StateDialogsPageDialogsItemType = {
    id: number
    name: string
}

type StateProfilePageType = {
    posts: StateProfilePagePostsItemType[]
}

type StateDialogsPageType = {
    messages: StateDialogsPageMessagesItemType[]
    dialogs: StateDialogsPageDialogsItemType[]
}

type StateObjectType = {
    profilePage: StateProfilePageType
    dialogsPage: StateDialogsPageType
}

type StateType = {
    state: StateObjectType
}

let state: StateObjectType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 23},
            {id: 3, message: 'Blabla', likesCount: 5},
            {id: 4, message: 'Dada', likesCount: 7},
        ]
    },
    dialogsPage: {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How is your it-kamasutra'},
            {id: 3, message: 'Yo'},
            {id: 4, message: 'Yo'},
            {id: 5, message: 'Yo'}
        ],
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Andrey'},
            {id: 3, name: 'Sveta'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Viktor'},
            {id: 6, name: 'Valera'}
        ]
    }
}

export default state