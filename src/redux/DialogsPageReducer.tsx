import {
    AddMessageDispatchType,
    DispatchActionsType,
    StateDialogsPageMessagesItemType,
    StateDialogsPageType, UpdateMessageDispatchType
} from "./store";

export const ADD_MESSAGE = 'ADD-MESSAGE'
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const initialState = {
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

export const dialogsPageReducer = (state: StateDialogsPageType = initialState, action: DispatchActionsType) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage: StateDialogsPageMessagesItemType = {
                id: 10,
                message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.text
            return state
        default:
            return state
    }
}

export const addMessageActionCreator = (): AddMessageDispatchType => ({type: ADD_MESSAGE})
export const updateMessageActionCreator = (text: string): UpdateMessageDispatchType => {
    return {type: UPDATE_NEW_MESSAGE_TEXT, text: text}
}