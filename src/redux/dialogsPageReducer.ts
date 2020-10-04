const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

export type AddMessageDialogsPageACType = {
    type: 'ADD_MESSAGE'
}

export type UpdateMessageDialogsPageACType = {
    type: 'UPDATE_NEW_MESSAGE_TEXT'
    text: string
}

type ActionsDialogsPageTypes = AddMessageDialogsPageACType
    | UpdateMessageDialogsPageACType

export type StateDialogsObjectPageType = {
    dialogsPage: StateDialogsPageType
}

export type StateDialogsPageMessagesItemType = {
    id: number
    message: string
}

export type StateDialogsPageDialogsItemType = {
    id: number
    name: string
}

export type StateDialogsPageType = {
    messages: StateDialogsPageMessagesItemType[]
    dialogs: StateDialogsPageDialogsItemType[]
    newMessageText: string
}

const initialState: StateDialogsPageType = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessageText: '',
}

export const dialogsPageReducer = (state: StateDialogsPageType = initialState, action: ActionsDialogsPageTypes): StateDialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let text = state.newMessageText
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: 10, message: text}]
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.text}
        default:
            return state
    }
}

export const addMessageActionCreator = (): AddMessageDialogsPageACType => ({type: ADD_MESSAGE})
export const updateMessageActionCreator = (text: string): UpdateMessageDialogsPageACType => {
    return {type: UPDATE_NEW_MESSAGE_TEXT, text: text}
}