import {
    AddMessageDispatchType,
    DispatchActionsType,
    StateDialogsPageMessagesItemType,
    StateDialogsPageType, UpdateMessageDispatchType
} from "./state";

export const ADD_MESSAGE = 'ADD-MESSAGE'
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const dialogsPageReducer = (state: StateDialogsPageType, action: DispatchActionsType) => {
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