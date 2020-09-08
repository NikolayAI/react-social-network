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

export type StateProfilePageType = {
    posts: StateProfilePagePostsItemType[]
    newPostText: string
}

export type StateDialogsPageType = {
    messages: StateDialogsPageMessagesItemType[]
    dialogs: StateDialogsPageDialogsItemType[]
}

export type StateObjectType = {
    profilePage: StateProfilePageType
    dialogsPage: StateDialogsPageType
}

export type StoreType = {
    state: StateObjectType
    addPost: () => void
    updateNewPostText: (newText: string) => void
    rerenderEntireTree: () => void
    subscribe: (observer: () => void) => void
}

export let store: StoreType = {
    state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 23},
                {id: 3, message: 'Blabla', likesCount: 5},
                {id: 4, message: 'Dada', likesCount: 7},
            ],
            newPostText: 'social-network'
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
    },
    addPost() {
        let newPost: StateProfilePagePostsItemType = {
            id: 5,
            message: this.state.profilePage.newPostText,
            likesCount: 0
        }
        this.state.profilePage.posts.push(newPost)
        this.state.profilePage.newPostText = ''
        this.rerenderEntireTree()
    },
    updateNewPostText(newText: string) {
        this.state.profilePage.newPostText = newText
        this.rerenderEntireTree()
    },
    rerenderEntireTree() {
        console.log('state has been changed')
    },
    subscribe(observer: () => void) {
        this.rerenderEntireTree = observer
    }
}

export default store